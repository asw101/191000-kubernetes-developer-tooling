# KUBEFLOW + JUPYTER

## check we have gpu node(s)
```bash
kubectl get nodes "-o=custom-columns=NAME:.metadata.name,GPU:.status.allocatable.nvidia\.com/gpu"
```

## install kfctl
```
RELEASE='v0.6.2'
curl -OL "https://github.com/kubeflow/kubeflow/releases/download/${RELEASE}/kfctl_${RELEASE}_darwin.tar.gz"
tar -C /usr/local/bin/ -xvf kfctl_${RELEASE}_darwin.tar.gz
rm kfctl_${RELEASE}_darwin.tar.gz
```

## setup and deploy kubeflow

```bash
# Initialize a kubeflow app:

mkdir kfapp
export KFAPP=$(pwd)/kfapp
export CONFIG='https://raw.githubusercontent.com/kubeflow/kubeflow/v0.6.2/bootstrap/config/kfctl_k8s_istio.0.6.2.yaml'

kfctl init ${KFAPP} --config=${CONFIG}

# Generate and deploy the app:
cd ${KFAPP}
kfctl generate all -V
kfctl apply all -V

kubectl get all -n kubeflow

kubectl port-forward svc/istio-ingressgateway -n istio-system 8080:80
```

## delete kubeflow
```bash
cd ${KFAPP}
kfctl delete all -V
```

## explore jupyter notebooks

1. Open `Notebook Servers`.
1. Click `Select namespace` and choose `kubeflow-anonymous`.
1. Create notebook and set `Extra Resources` to `{"nvidia.com/gpu":1}`.
1. Create a `Python 3` notebook.
1. Paste the below into a cell and run the cell.

```python
from tensorflow.examples.tutorials.mnist import input_data
mnist = input_data.read_data_sets("MNIST_data/", one_hot=True)

import tensorflow as tf

x = tf.placeholder(tf.float32, [None, 784])

W = tf.Variable(tf.zeros([784, 10]))
b = tf.Variable(tf.zeros([10]))

y = tf.nn.softmax(tf.matmul(x, W) + b)

y_ = tf.placeholder(tf.float32, [None, 10])
cross_entropy = tf.reduce_mean(-tf.reduce_sum(y_ * tf.log(y), reduction_indices=[1]))

train_step = tf.train.GradientDescentOptimizer(0.05).minimize(cross_entropy)

sess = tf.InteractiveSession()
tf.global_variables_initializer().run()

for _ in range(1000):
    batch_xs, batch_ys = mnist.train.next_batch(100)
    sess.run(train_step, feed_dict={x: batch_xs, y_: batch_ys})

correct_prediction = tf.equal(tf.argmax(y,1), tf.argmax(y_,1))
accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))
print("Accuracy: ", sess.run(accuracy, feed_dict={x: mnist.test.images, y_: mnist.test.labels}))
```

## Resources
- https://www.kubeflow.org/docs/azure/deploy/install-kubeflow/
- https://www.kubeflow.org/docs/notebooks/setup/#experiment-with-your-notebook
