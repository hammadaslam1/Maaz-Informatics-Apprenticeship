import os from "os";

export const checkServerIp = (req, res) => {
    // Get network interfaces
    const networkInterfaces = os.networkInterfaces();
    let ipAddress = "";

    // Loop through the network interfaces to find the first valid IPv4 address
    for (const interfaceName in networkInterfaces) {
        for (const iface of networkInterfaces[interfaceName]) {
            if (iface.family === "IPv4" && !iface.internal) {
                ipAddress = iface.address; // Get the IPv4 address
                break;
            }
        }
        if (ipAddress) break; // Break if we found an IP
    }

    // Send the IP address as a response
    res.send({ serverIp: ipAddress });
};