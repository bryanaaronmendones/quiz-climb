const { unauthorized, forbidden } = require('../errors/app-error');

module.exports = function (...allowedRoles) {
  return function (req, res, next) {
    // Kunin ang demo user mula sa header (batay sa lab guide)
    const demoUserHeader = req.headers['x-demo-user'];
    
    // Para sa testing, maglagay ng simpleng mock o pagbasa mula sa database/seeder kung kinakailangan
    // Karaniwan sa lab na ito, ang x-demo-user header ay naglalaman ng user id o role
    if (!demoUserHeader) {
      throw unauthorized('No user is signed in.');
    }

    // Halimbawa: i-attach ang user object sa req
    // Maaari itong i-adjust depende sa iyong seeder/database setup
    req.user = {
      user_id: parseInt(demoUserHeader, 10) || 1,
      role: demoUserHeader.toUpperCase().includes('ADMIN') ? 'ADMIN' : 'HOST'
    };

    if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
      throw forbidden('You do not have the required role to access this resource.');
    }

    next();
  };
};