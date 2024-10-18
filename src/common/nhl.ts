export async function getNhl(endpoint: string) {
    const url = 'https://corsproxy.io/?' + encodeURIComponent(`https://api-web.nhle.com/v1/${endpoint}`);
    const standings_now = await fetch(url,
        {
            method: 'GET',
        }
    )
    return await standings_now.json();
}
