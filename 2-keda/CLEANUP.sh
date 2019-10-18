helm delete --purge keda
kubectl delete serviceaccount keda-serviceaccount
kubectl delete crd scaledobjects.keda.k8s.io
kubectl delete crd triggerauthentications.keda.k8s.io