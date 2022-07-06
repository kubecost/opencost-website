---
sidebar_position: 2
---

# Installation

## Via Helm

The easiest way to get started with OpenCost is to install with the [Kubecost helm chart](https://github.com/kubecost/cost-analyzer-helm-chart/). This can be done with helm 3 using the following commands:

```
helm repo add kubecost https://kubecost.github.io/cost-analyzer/
helm upgrade --install kubecost kubecost/cost-analyzer --namespace kubecost --create-namespace
```

This install method provides access to all OpenCost and Community Kubecost functionality, can scale to large clusters, and is available for free.

## Alternative install options

- You can run [helm template](https://helm.sh/docs/helm/helm_template/) against the [Kubecost helm chart](https://github.com/kubecost/cost-analyzer-helm-chart/) to generate local YAML output. This requires extra effort when compared to directly installing the helm chart but is more flexible than deploying static YAML.

- Lastly, you can deploy OpenCost directly as a pod. Directions for this install path are available [here](./basic-setup.md). This install path just deploys the underlying OpenCost allocation model with an API endpoint or use with a basic UI. It is not intended to be enterprise-ready.
