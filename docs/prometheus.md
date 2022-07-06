---
sidebar_position: 8
---
# Prometheus Usage

OpenCost allows you to export pricing data to Prometheus and then write custom queries for cost insights. Below are instructions for accomplishing this and a set of example queries to get you started.

## Configuration



```
- job_name: opencost
  honor_labels: true
  scrape_interval: 1m
  scrape_timeout: 10s
  metrics_path: /metrics
  scheme: http
  static_configs:
  - targets:
    - < address of opencost service> # example: <service-name>.<namespace>:<port>
```

## Example queries

Below are a set of sample queries that can be run after Prometheus begins ingesting OpenCost data:

__Monthly cost of top 5 containers__

```
topk( 5,
  container_memory_allocation_bytes* on(instance) group_left() node_ram_hourly_cost  / 1024 / 1024 / 1024 * 730
  +
  container_cpu_allocation * on(instance) group_left() node_cpu_hourly_cost * 730
)
```

__Hourly memory cost for the *default* namespace__

```
sum(
  avg(container_memory_allocation_bytes{namespace="default"}) by (instance) / 1024 / 1024 / 1024
  *
  on(instance) group_left() avg(node_ram_hourly_cost) by (instance)
)
```

__Monthly cost of currently provisioned nodes__

```
sum(node_total_hourly_cost) * 730
```


## Available Metrics

**Note:** metrics today have both *instance* and *node* labels. The *instance* label will be deprecated in a future version.

| Metric       | Description                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------ |
| node_cpu_hourly_cost | Hourly cost per vCPU on this node  |
| node_gpu_hourly_cost | Hourly cost per GPU on this node  |
| node_ram_hourly_cost   | Hourly cost per Gb of memory on this node                       |
| node_total_hourly_cost   | Total node cost per hour                       |
| kubecost_load_balancer_cost   | Hourly cost of a load balancer                 |
| kubecost_cluster_management_cost | Hourly management fee per cluster                 |
| pv_hourly_cost   | Hourly cost per GP on a persistent volume                 |
| node_gpu_count | Number of GPUs available on node |
| container_cpu_allocation   | Average number of CPUs requested/used over last 1m                      |
| container_gpu_allocation   | Average number of GPUs requested over last 1m                      |
| container_memory_allocation_bytes   | Average bytes of RAM requested/used over last 1m                 |
| pod_pvc_allocation   | Bytes provisioned for a PVC attached to a pod                      |
