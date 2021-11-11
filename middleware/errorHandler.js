export default function (err, req, res, next) {
  if (!err.status) {
    res.status(500).json("Internal server error");
  } else {
    res.status(err.status).json({ error: err.message });
  }
}
