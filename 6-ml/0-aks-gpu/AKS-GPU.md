# AKS GPU

```bash
# confirm gpu capacity
kubectl get nodes -o json | jq '.items[].status.capacity'

kubectl get nodes

# apply taint
kubectl taint node aks-gpu1-27577304-vmss000000 sku=gpu:NoSchedule

# more details
kubectl create namespace gpu-resources

kubectl apply -f nvidia-device-plugin-ds.yaml
```

## Resources
- https://docs.microsoft.com/en-us/azure/aks/operator-best-practices-advanced-scheduler
