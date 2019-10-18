# VIRTUAL KUBELET

```bash
# variables
RESOURCE_GROUP='191000-cloud-actions'
AKS_NAME='aks1'

az provider list --query "[?contains(namespace,'Microsoft.ContainerInstance')]" -o table
az provider register --namespace Microsoft.ContainerInstance

# authenticate against my cluster
az aks get-credentials -g $RESOURCE_GROUP -n $AKS_NAME
kubectl get nodes

# add rbac
kubectl apply -f helm/rbac-virtual-kubelet.yaml

helm init --service-account tiller --upgrade 

kubectl get pods -A

helm list

# install connector

az aks install-connector \
    --resource-group $RESOURCE_GROUP \
    --name $AKS_NAME \
    --connector-name virtual-kubelet \
    --os-type Both

kubectl get pods

kubectl create -f deploy/virtual-kubelet-linux.yaml

kubectl create -f deploy/virtual-kubelet-windows.yaml

kubectl get pods -o wide

# remove connector

az aks remove-connector \
    --resource-group $RESOURCE_GROUP \
    --name $AKS_NAME \
    --connector-name virtual-kubelet \
    --os-type Both

```

## Resources
- https://docs.microsoft.com/en-us/azure/aks/virtual-kubelet
- https://oscon2019.container.training/#168