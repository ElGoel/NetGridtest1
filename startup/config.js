import config from 'config';

function setConfig(app) {
    const port = 3000;

    app.listen(port, () => {
        console.log('listening on port 3000');
    })
}

export default setConfig;