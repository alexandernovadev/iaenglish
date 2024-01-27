import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res
    .status(200)
    .json({
      message: "Archivo procesado y guardado con éxito",
      error: "newData.length,"
    });
}
