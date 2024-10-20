import os from "os";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const networkInterfaces = os.networkInterfaces();
  let ipAddress = "";

  for (const interfaceName in networkInterfaces) {
    for (const iface of networkInterfaces[interfaceName]) {
      if (iface.family === "IPv4" && !iface.internal) {
        ipAddress = iface.address;
        break;
      }
    }
    if (ipAddress) break;
  }
  return NextResponse.json({
    success: true,
    message: "app is running successfully",
    ip: ipAddress,
  });
};
