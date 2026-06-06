import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    // format: Bearer token

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, login again',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // check role
    if (decoded.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied, admin only',
      });
    }

    req.admin = decoded; // store admin info
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
};

export default adminAuth;
