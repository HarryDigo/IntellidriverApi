import jwt from 'jsonwebtoken'

export const jwtAuthentication = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Access denied')
  }

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) {
      return res.status(401).send('Invalid token')
    }

    req.user = user
    next()
  })
}