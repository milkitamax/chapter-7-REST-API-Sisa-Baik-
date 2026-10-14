import { HttpError } from "../lib/api.js";

export function tanganiError(error, req, res, next) {
  if (res.headersSent) return next(error);

  let status = 500;
  let code = "INTERNAL_SERVER_ERROR";
  let message = "Terjadi kesalahan pada server.";

  if (error instanceof HttpError) {
    ({ status, code, message } = error);
  } else if (error.type === "entity.parse.failed") {
    status = 400;
    code = "INVALID_JSON";
    message = "JSON tidak valid.";
  } else if (error.type === "entity.too.large") {
    status = 413;
    code = "PAYLOAD_TOO_LARGE";
    message = "Payload melebihi 20 KB.";
  } else if (["23503", "23001"].includes(error.code)) {
    status = 409;
    code = "REFERENCE_CONFLICT";
    message = "Relasi tidak valid atau data masih dipakai riwayat pesanan.";
  } else if (error.code === "23505") {
    status = 409;
    code = "DUPLICATE_DATA";
    message = "Data bertentangan dengan data yang sudah ada.";
  } else {
    console.error(error);
  }

  return res.status(status).json({
    success: false,
    error: { code, message },
  });
}