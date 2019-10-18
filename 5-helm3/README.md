# HELM 3

```bash
# via: https://github.com/helm/helm/releases
RELEASE='helm-v3.0.0-beta.4-darwin-amd64.tar.gz'
curl -OL https://get.helm.sh/${RELEASE}
tar -xvf ${RELEASE}
mv darwin-amd64/helm /usr/local/bin/helm3
rm -rf darwin-amd64/
rm ${RELEASE}
helm3

# aliases for helm3 and code-insiders
alias h='helm3'
alias c='code-insiders'
```

## Quickstart
```bash
helm3 repo add stable https://kubernetes-charts.storage.googleapis.com/
helm3 repo update
helm3 search repo stable -o json | jq '.[]'
helm3 install hello-helm charts/python
helm3 install stable/minecraft --generate-name \
    --set minecraftServer.eula=true 
kubectl get svc --namespace default -w minecraft-1571185206-minecraft
helm3 ls
```

## Getting Started
```bash
helm3 create getting-started

# Here's what we have:
# - NOTES.txt: The “help text” for your chart. This will be displayed to your users when they run helm install.
# - deployment.yaml: A basic manifest for creating a Kubernetes deployment
# - service.yaml: A basic manifest for creating a service endpoint for your deployment
# - _helpers.tpl: A place to put template helpers that you can re-use throughout the chart

rm -rf getting-started/templates/*

# c -r getting-started/templates/configmap.yaml
```

getting-started/templates/configmap.yaml:
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mychart-configmap
data:
  myvalue: "Hello World"
```

```bash
helm3 install example-01 ./getting-started

helm3 list -o 

helm3 get manifest example-01

# c -r getting-started/templates/configmap.yaml
```

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Release.Name }}-configmap
data:
  myvalue: "Hello World"
```

```bash
helm3 install example-02 ./getting-started

helm3 get manifest example-02

helm install --debug --dry-run ./getting-started

helm3 uninstall example-01

helm3 uninstall example-02
```

Continue: <https://v3.helm.sh/docs/topics/chart_template_guide/>

## Resources
- https://v3.helm.sh/docs/
- https://v3.helm.sh/docs/intro/quickstart/
- https://helm.sh/blog/helm-3-preview-pt1/
