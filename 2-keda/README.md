# KEDA

```bash
helm repo add kedacore https://kedacore.azureedge.net/helm

helm repo update

# helm install kedacore/keda-edge --devel --set logLevel=debug --namespace keda --name keda
# temporary workaround:
helm install ./keda-edge --name keda

# rabbitmq and go example:

git clone https://github.com/kedacore/sample-go-rabbitmq
PASSWORD=$(openssl rand -hex 6)'A1!'
mkdir -p _/ && echo -n $PASSWORD > _/PASSWORD.txt
# update values in sample-go-rabbitmq/deploy

helm install --name rabbitmq \
    --set rabbitmq.username=user,rabbitmq.password=${PASSWORD} \
    stable/rabbitmq

# kubectl
kubectl apply -f sample-go-rabbitmq/deploy/deploy-consumer.yaml

kubectl get deploy

kubectl delete -f sample-go-rabbitmq/deploy/deploy-publisher-job.yaml
kubectl apply -f sample-go-rabbitmq/deploy/deploy-publisher-job.yaml

kubectl get jobs

kubectl get pods -w

# helm
PASSWORD=$(openssl rand -hex 6)'A1!'
helm3 install rabbitmq stable/rabbitmq \
    --set rabbitmq.username=user,rabbitmq.password=${PASSWORD},persistence.enabled=false
    
helm3 install sample-consumer ./sample-helm-consumer \
    --set rabbitmq.username=user,rabbitmq.password=${PASSWORD}

helm3 install ./sample-helm-publisher --generate-name \
    --set rabbitmq.username=user,rabbitmq.password=${PASSWORD}

kubectl logs deploy/sample-consumer-rabbitmq-consumer

```

## Resources
- https://github.com/kedacore/keda
