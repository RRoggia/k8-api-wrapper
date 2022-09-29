const { getEKSToken } = require("./aws")
const createK8Api = require("./k8")

async function listPods() {
    console.log("Generating token")
    const token = await getEKSToken(process.env.K8_CLUSTER_NAME)

    if( process.env.DEBUG === "true" ) {
        console.log(`Token is generated ${token}`)
    }
    
    console.log("Creating K8 API client and sending request")
    const k8Api = createK8Api(process.env.K8_CLUSTER_USERNAME, token)
    const pods = []
    
    console.log("Mapping the response body")
    const { body } = await k8Api.listPodNames()
    for (let i = 0; i < body.items.length; i++) {
        const pod = body.items[i]

        pods.push( {
            podName: pod.metadata.name,
            creationTimestamp: pod.metadata.creationTimestamp,
            dockerImage: pod.spec.containers[0].image
        } )
    }
    return pods

}

module.exports = {
    listPods
}