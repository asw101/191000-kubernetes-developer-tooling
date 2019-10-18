# KUBEFLOW

## examples

See: [0-examples/README.md](0-examples/README.md)

## GPUs & more

```bash
# running our model on kubernetes: https://github.com/Azure/kubeflow-labs/blob/master/2-kubernetes/README.md#running-our-model-on-kubernetes
helm3 create kf2 ./2-mnist-lab-gpu
# 2-mnist-lab-gpu/templates/3-mnist-training.yaml
helm3 delete kf2 ./2-mnist-lab-gpu
helm3 upgrade kf2 ./2-mnist-lab-gpu
kubectl get pods
```

## Resources
- https://www.youtube.com/watch?v=uL_pqP_HgcY
- https://github.com/Azure/kubeflow-labs
- https://www.kubeflow.org/docs/azure/deploy/install-kubeflow/
