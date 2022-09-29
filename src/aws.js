// currently amazon eks sdk doesnot support get-token operation available in cli - see for more information https://github.com/aws/aws-sdk-js/issues/2833
const { SignatureV4 } = require("@aws-sdk/signature-v4")
const { Sha256 } = require("@aws-crypto/sha256-js")
const { fromEnv } = require("@aws-sdk/credential-providers")

 const signer = new SignatureV4({
    credentials: fromEnv(),
    region: process.env.AWS_REGION ?? "",
    service: "sts",
    sha256: Sha256,
  })

async function getEKSToken( clusterId ) {  
    const request = await signer.presign(
    {
        headers: {
            host: `sts.${process.env.AWS_REGION}.amazonaws.com`,
            "x-k8s-aws-id": clusterId,
        },
        hostname: `sts.${process.env.AWS_REGION}.amazonaws.com`,
        method: "GET",
        path: "/",
        protocol: "https:",
        query: {
            Action: "GetCallerIdentity",
            Version: "2011-06-15",
        },
    },
    { expiresIn: 0 }
    )

    const query = Object.keys(request?.query ?? {})
    .map(
        (q) =>
        encodeURIComponent(q) +
        "=" +
        encodeURIComponent(request.query?.[q])
        )
        .join("&");
    
    const url = `https://${request.hostname}${request.path}?${query}`
    
    return "k8s-aws-v1." + Buffer.from(url).toString("base64url")
}

module.exports = {
    getEKSToken
}