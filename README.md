# K8-API-WRAPPER 
Simple HTTP API that exposes to the internet K8 pod information. This is intended to use for cluster that run privatelly, and developers might not have access to the cluster. This exposes through a REST API an option to access pods information.

![intended architecture](./docs/k8-api-wrappers.png)

## Routes

### GET `/healthy`
```
{
    "status": 200
}
```

### GET `listPods`
Response
```
[
    {
        "podName": "camel-k-operator-647ffc8866-9lh2q",
        "creationTimestamp": "2022-09-27T13:07:45.000Z",
        "dockerImage": "docker.io/apache/camel-k:1.10.0"
    },
    {
        "podName": "hello-node-775ff78448-jftsc",
        "creationTimestamp": "2022-08-30T19:28:42.000Z",
        "dockerImage": "registry.k8s.io/echoserver:1.4"
    },
    {
        "podName": "rroggia-node-hello-deploy-869c964fd4-85kbs",
        "creationTimestamp": "2022-09-04T01:08:38.000Z",
        "dockerImage": "rroggia/node-hello:latest"
    },
    {
        "podName": "rroggia-node-hello-deploy-869c964fd4-cznjj",
        "creationTimestamp": "2022-09-04T01:08:38.000Z",
        "dockerImage": "rroggia/node-hello:latest"
    }
]
```