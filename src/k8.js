const k8s = require('@kubernetes/client-node')

function createK8API( userName, token ) {

    const cluster = {
        name: process.env.K8_CLUSTER_NAME,
        server: process.env.K8_CLUSTER_SERVER,
        caData: process.env.K8_CLUSTER_CADATA,
    }

    const user = {
        name: userName,
        token
    }

    const context = {
        name: process.env.K8_CLUSTER_CONTEXT_NAME,
        user: user.name,
        cluster: cluster.name,
    }

    const kc = new k8s.KubeConfig()
    kc.loadFromOptions( {
        clusters: [cluster],
        users: [user],
        contexts: [context],
        currentContext: context.name,
    } )

    const k8sApi = kc.makeApiClient( k8s.CoreV1Api )

    return {
        listPodNames: ( namespace = 'default' ) => k8sApi.listNamespacedPod( namespace )
    }
}

module.exports = createK8API