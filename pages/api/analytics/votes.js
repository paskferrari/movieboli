import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        return await getAdvancedAnalytics(req, res);
      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Analytics API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAdvancedAnalytics(req, res) {
  const { timeframe = '7d', filmId } = req.query;
  
  try {
    // Calcola il range temporale
    const now = new Date();
    const timeRanges = {
      '24h': new Date(now.getTime() - 24 * 60 * 60 * 1000),
      '7d': new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      '30d': new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      'all': new Date('2024-01-01')
    };
    
    const startDate = timeRanges[timeframe] || timeRanges['7d'];
    
    // Query base per i voti
    let query = supabase
      .from('votes')
      .select(`
        *,
        users:user_id (
          id,
          email,
          user_metadata
        )
      `)
      .gte('created_at', startDate.toISOString());
    
    if (filmId) {
      query = query.eq('film_id', filmId);
    }
    
    const { data: votes, error } = await query;
    
    if (error) throw error;
    
    // Analisi generale
    const analytics = {
      overview: {
        totalVotes: votes.length,
        uniqueUsers: new Set(votes.map(v => v.user_id)).size,
        averageRating: votes.length > 0 ? votes.reduce((sum, v) => sum + v.rating, 0) / votes.length : 0,
        timeframe,
        lastUpdate: new Date().toISOString()
      },
      
      // Statistiche per film
      filmStats: {},
      
      // Trend temporali
      trends: [],
      
      // Demografia utenti
      demographics: {
        ageGroups: {},
        genderDistribution: {},
        locationDistribution: {}
      },
      
      // Analisi comportamentale
      behavior: {
        votingPatterns: {},
        engagementMetrics: {},
        peakHours: []
      }
    };
    
    // Calcola statistiche per film
    const filmGroups = votes.reduce((acc, vote) => {
      if (!acc[vote.film_id]) {
        acc[vote.film_id] = [];
      }
      acc[vote.film_id].push(vote);
      return acc;
    }, {});
    
    Object.entries(filmGroups).forEach(([filmId, filmVotes]) => {
      const ratings = filmVotes.map(v => v.rating);
      const totalVotes = filmVotes.length;
      const averageRating = ratings.reduce((sum, r) => sum + r, 0) / totalVotes;
      const medianRating = ratings.sort((a, b) => a - b)[Math.floor(totalVotes / 2)];
      
      // Distribuzione dei voti
      const ratingDistribution = {};
      for (let i = 0.5; i <= 5; i += 0.5) {
        ratingDistribution[i] = ratings.filter(r => r === i).length;
      }
      
      analytics.filmStats[filmId] = {
        title: filmId, // Qui potresti fare join con tabella films se esiste
        totalVotes,
        averageRating: Math.round(averageRating * 100) / 100,
        medianRating,
        ratingDistribution,
        standardDeviation: calculateStandardDeviation(ratings),
        votingVelocity: calculateVotingVelocity(filmVotes),
        userEngagement: calculateUserEngagement(filmVotes),
        trendDirection: calculateTrendDirection(filmVotes)
      };
    });
    
    // Calcola trend temporali (per ora, giorno)
    const dailyTrends = {};
    votes.forEach(vote => {
      const date = new Date(vote.created_at).toISOString().split('T')[0];
      if (!dailyTrends[date]) {
        dailyTrends[date] = { votes: 0, totalRating: 0, films: new Set() };
      }
      dailyTrends[date].votes++;
      dailyTrends[date].totalRating += vote.rating;
      dailyTrends[date].films.add(vote.film_id);
    });
    
    analytics.trends = Object.entries(dailyTrends)
      .map(([date, data]) => ({
        date,
        votes: data.votes,
        averageRating: data.totalRating / data.votes,
        uniqueFilms: data.films.size
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Analisi demografica
    votes.forEach(vote => {
      const user = vote.users;
      if (user?.user_metadata) {
        const metadata = user.user_metadata;
        
        // Età
        if (metadata.age) {
          const ageGroup = getAgeGroup(metadata.age);
          analytics.demographics.ageGroups[ageGroup] = 
            (analytics.demographics.ageGroups[ageGroup] || 0) + 1;
        }
        
        // Genere
        if (metadata.gender) {
          analytics.demographics.genderDistribution[metadata.gender] = 
            (analytics.demographics.genderDistribution[metadata.gender] || 0) + 1;
        }
        
        // Località
        if (metadata.city) {
          analytics.demographics.locationDistribution[metadata.city] = 
            (analytics.demographics.locationDistribution[metadata.city] || 0) + 1;
        }
      }
    });
    
    // Analisi comportamentale
    analytics.behavior.peakHours = calculatePeakHours(votes);
    analytics.behavior.votingPatterns = calculateVotingPatterns(votes);
    analytics.behavior.engagementMetrics = calculateEngagementMetrics(votes);
    
    return res.status(200).json({
      success: true,
      analytics
    });
    
  } catch (error) {
    console.error('Error in getAdvancedAnalytics:', error);
    return res.status(500).json({ error: 'Errore nel recupero delle analitiche' });
  }
}

// Funzioni di utilità
function calculateStandardDeviation(ratings) {
  const mean = ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
  const variance = ratings.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / ratings.length;
  return Math.sqrt(variance);
}

function calculateVotingVelocity(votes) {
  if (votes.length < 2) return 0;
  
  const sortedVotes = votes.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  const firstVote = new Date(sortedVotes[0].created_at);
  const lastVote = new Date(sortedVotes[sortedVotes.length - 1].created_at);
  const hoursDiff = (lastVote - firstVote) / (1000 * 60 * 60);
  
  return hoursDiff > 0 ? votes.length / hoursDiff : 0;
}

function calculateUserEngagement(votes) {
  const uniqueUsers = new Set(votes.map(v => v.user_id)).size;
  const totalVotes = votes.length;
  return uniqueUsers > 0 ? totalVotes / uniqueUsers : 0;
}

function calculateTrendDirection(votes) {
  if (votes.length < 2) return 'stable';
  
  const sortedVotes = votes.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  const firstHalf = sortedVotes.slice(0, Math.floor(votes.length / 2));
  const secondHalf = sortedVotes.slice(Math.floor(votes.length / 2));
  
  const firstAvg = firstHalf.reduce((sum, v) => sum + v.rating, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((sum, v) => sum + v.rating, 0) / secondHalf.length;
  
  const diff = secondAvg - firstAvg;
  if (diff > 0.1) return 'increasing';
  if (diff < -0.1) return 'decreasing';
  return 'stable';
}

function getAgeGroup(age) {
  if (age < 18) return 'Under 18';
  if (age < 25) return '18-24';
  if (age < 35) return '25-34';
  if (age < 45) return '35-44';
  if (age < 55) return '45-54';
  if (age < 65) return '55-64';
  return '65+';
}

function calculatePeakHours(votes) {
  const hourCounts = {};
  votes.forEach(vote => {
    const hour = new Date(vote.created_at).getHours();
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  });
  
  return Object.entries(hourCounts)
    .map(([hour, count]) => ({ hour: parseInt(hour), count }))
    .sort((a, b) => b.count - a.count);
}

function calculateVotingPatterns(votes) {
  const patterns = {
    averageVotesPerUser: 0,
    mostActiveUsers: [],
    votingFrequency: {}
  };
  
  const userVotes = {};
  votes.forEach(vote => {
    if (!userVotes[vote.user_id]) {
      userVotes[vote.user_id] = [];
    }
    userVotes[vote.user_id].push(vote);
  });
  
  const voteCounts = Object.values(userVotes).map(votes => votes.length);
  patterns.averageVotesPerUser = voteCounts.reduce((sum, count) => sum + count, 0) / voteCounts.length;
  
  patterns.mostActiveUsers = Object.entries(userVotes)
    .map(([userId, votes]) => ({ userId, voteCount: votes.length }))
    .sort((a, b) => b.voteCount - a.voteCount)
    .slice(0, 10);
  
  return patterns;
}

function calculateEngagementMetrics(votes) {
  const metrics = {
    totalEngagementTime: 0,
    averageSessionLength: 0,
    returnUserRate: 0
  };
  
  // Calcoli semplificati per ora
  const uniqueUsers = new Set(votes.map(v => v.user_id)).size;
  const totalVotes = votes.length;
  
  metrics.averageVotesPerSession = totalVotes / uniqueUsers;
  metrics.engagementRate = (totalVotes / uniqueUsers) * 100;
  
  return metrics;
}