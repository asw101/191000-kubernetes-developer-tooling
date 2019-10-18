# HELM

```bash
# install helm (mac)
# we hit an error with helm v2.14.2 so we'll try to upgrade
brew install kubernetes-helm

kubectl get deploy -A

# delete tiller
kubectl delete deploy -n kube-system tiller-deploy

# purge deleted release
helm list --all
delm delete --purge $RELEASE
```

## Resources
- https://helm.sh/docs/using_helm/
