export const postApi = (req, res) => {
  res.status(201).json({ message: "API endpoint for retrieving data (POST)" });
};

export const putApi = (req, res) => {
  res.status(201).json({ message: "API endpoint for retrieving data (PUT)" });
};

export const getApi = (req, res) => {
  res.status(200).json({ message: "API endpoint for retrieving data (GET)" });
};

export const deleteApi = (req, res) => {
  res
    .status(200)
    .json({ message: "API endpoint for retrieving data (DELETE)" });
};
