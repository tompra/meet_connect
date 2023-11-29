import mockData from './mock-data';

export const extractLocations = (events) => {
    try {
        const extractedLocations = events.map((event) => event.location);
        const locations = [...new Set(extractedLocations)];
        return locations;
    } catch (error) {
        console.error(`Error extracting locations: ${error}`);
    }
};

export const getEvents = async () => {
    try {
        if (window.location.href.startsWith('http://localhost')) {
            return mockData;
        }

        if (!navigator.onLine) {
            const events = localStorage.getItem('lastEvents');
            return events ? JSON.parse(events) : [];
        }

        const token = await getAccessToken();

        if (token) {
            removeQuery();
            const url = `https://bfumnimxia.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/${token}`;
            const response = await fetch(url);
            const result = await response.json();
            if (result) {
                localStorage.setItem(
                    'lastEvents',
                    JSON.stringify(result.events)
                );
                return result.events;
            } else return null;
        }
    } catch (error) {
        console.error(`Error getting events: ${error}`);
    }
};

export const getAccessToken = async () => {
    try {
        const accessToken = localStorage.getItem('access_token');
        const tokenCheck = accessToken && (await checkToken(accessToken));

        if (!accessToken || tokenCheck.error) {
            localStorage.removeItem('access_token');
            const searchParams = new URLSearchParams(window.location.search);
            const code = await searchParams.get('code');

            if (!code) {
                const response = await fetch(
                    'https://bfumnimxia.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url'
                );
                const result = await response.json();
                console.log('result.authUrl', result.authUrl);
                const { authUrl } = result;
                return (window.location.href = authUrl);
            }
            return code && getToken(code);
        }
        return accessToken;
    } catch (error) {
        console.error(`Error catch in get access token: ${error}`);
        throw new Error(`Error catch in get token: ${error}`);
    }
};

const checkToken = async (accessToken) => {
    try {
        const response = await fetch(
            `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
        );
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(`Error checking token: ${error}`);
        throw new Error(`Error catch in get token: ${error}`);
    }
};

const getToken = async (code) => {
    try {
        const encodeCode = encodeURIComponent(code);
        const response = await fetch(
            `https://bfumnimxia.execute-api.eu-central-1.amazonaws.com/dev/api/token/${encodeCode}`
        );
        if (!response.ok) {
            throw new Error(`HTTP Error. Status ${response.status}`);
        }

        const { access_token } = await response.json();
        access_token && localStorage.setItem('access_token', access_token);
        return access_token;
    } catch (error) {
        console.error(`Error catch in get token: ${error}`);
        error.json();
        throw new Error(`Error catch in get token: ${error}`);
    }
};

const removeQuery = () => {
    try {
        let newUrl;
        if (window.history.pushState && window.location.pathname) {
            newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
            window.history.pushState('', '', newUrl);
        } else {
            newUrl = `${window.location.protocol}${window.location.host}`;
            window.location.pushState('', '', newUrl);
        }
    } catch (error) {
        console.error(`Error removing query: ${error}`);
        throw new Error(`Error catch in get token: ${error}`);
    }
};
