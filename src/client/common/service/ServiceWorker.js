import SubscriptionService from './Subscription';

const SERVICE_WORKER_API = 'serviceWorker';
const SERVICE_WORKER_FILE_PATH = '/service-worker.js';

const isSupportServiceWorker = () => SERVICE_WORKER_API in navigator;

const sendMessageToSW = msg => new Promise((resolve, reject) => {
    const messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = event => {
        if (event.data.error) {
            reject(event.data.error);
        } else {
            resolve(event.data);
        }
    };

    navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage(msg, [messageChannel.port2]);
});

if (isSupportServiceWorker()) {

    navigator.serviceWorker.addEventListener('message', e => console.log(e.data));
    
    navigator.serviceWorker.register(SERVICE_WORKER_FILE_PATH)
        .catch(console.error)
        .then(registration => 
            registration.pushManager.getSubscription()
            .then(subscription => subscription || registration.pushManager.subscribe({ userVisibleOnly: true })))
        .then(subscription => SubscriptionService.subscript(subscription))
        .catch(error => console.error('Subscribe Failure: ', error.message))
        .then(() => sendMessageToSW('Hello, service worker.'))
        .catch(() => console.error('Send message error.'));
} else {
    console.info('Browser not support Service Worker.');
}
