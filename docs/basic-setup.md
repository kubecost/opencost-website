---
sidebar_position: 4
---

# Basic Setup

Follow the steps below to install OpenCost Open Source.

See this page for all [Kubecost install options](http://docs.kubecost.com/install).

## Prerequisites

Install Prometheus:

```sh
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install my-prometheus prometheus-community/prometheus --namespace prom --create-namespace -f https://raw.githubusercontent.com/kubecost/opencost/develop/kubernetes/prometheus/extraScrapeConfigs.yaml
```

## OpenCost

If providing your own Prometheus, set [this environment variable](https://github.com/kubecost/opencost/blob/c211fbc1244a9da9667c7180a9e4c7f988d7978a/kubernetes/deployment.yaml#L33) to the address of your prometheus server.

If you used the Prometheus install command from above, the command below will install OpenCost on your cluster:

```sh
kubectl apply --namespace opencost -f https://raw.githubusercontent.com/kubecost/opencost/develop/kubernetes/opencost.yaml
```

Wait for the pod to be ready and then port forward with:

```sh
kubectl port-forward --namespace opencost service/opencost 9003
```

## Testing

To test that the server is running, you can hit [http://localhost:9003/allocation/compute?window=60m](http://localhost:9003/allocation/compute?window=60m)

See more [API Examples](./api.md).

Or use [kubectl cost](./kubectl-cost.md):

```sh
kubectl cost --service-port 9003 --service-name opencost --kubecost-namespace opencost --allocation-path /allocation/compute  \
    namespace \
    --window 5m \
    --show-efficiency=true
```

Output:

```
+---------+---------------+--------------------+-----------------+
| CLUSTER | NAMESPACE     | MONTHLY RATE (ALL) | COST EFFICIENCY |
+---------+---------------+--------------------+-----------------+
|         | opencost      |          18.295200 |        0.231010 |
|         | prom          |          17.992800 |        0.000000 |
|         | kube-system   |          11.383200 |        0.033410 |
+---------+---------------+--------------------+-----------------+
| SUMMED  |               |          47.671200 |                 |
+---------+---------------+--------------------+-----------------+
```

## Troubleshooting

If you get an error like this, check your prometheus target is correct in the OpenCost deployment.

```bash
Error: failed to query allocation API: failed to port forward query: received non-200 status code 500 and data: {"code":500,"status":"","data":null,"message":"Error: error computing allocation for ...
```

Negative values for idle: ensure you added the [scrape target](https://github.com/kubecost/opencost/blob/develop/PROMETHEUS.md) for OpenCost.

---

## Help

Please let us know if you run into any issues, we are here to help!

[Slack community](https://join.slack.com/t/kubecost/shared_invite/enQtNTA2MjQ1NDUyODE5LWFjYzIzNWE4MDkzMmUyZGU4NjkwMzMyMjIyM2E0NGNmYjExZjBiNjk1YzY5ZDI0ZTNhZDg4NjlkMGRkYzFlZTU)