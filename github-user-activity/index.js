async function getGitHubEvents(username) {
    const response = await fetch(`https://api.github.com/users/${username}/events`)
    if(!response.ok ){
        if(response.status == 404){
            throw new Error("Username not found");
        }else{
            throw new Error(`Error fetching data ${response.status}: ${response.statusText}`);
        }
    }
    return response.json()
}

function displayEvents(events) {
    for (const event of events) {
        switch (event.type) {
            case "PushEvent":
                const commits = event.payload.commits.length
                console.log(`Pushed ${commits} commit(s) to ${event.repo.name}`)
                break;
            case "CreateEvent":
                console.log(`Created ${event.payload.ref_type} in ${event.repo.name}`)
                break;
            case "WatchEvent":
                console.log(`Starred ${event.repo.name}`)
                break;
            case "IssuesEvent":
                console.log(`${event.payload.action.charAt(0).toUpperCase() + event.payload.action.slice(1)} the issue "${event.payload.issue.title}" in ${event.repo.name}`)
                break;
            default:
                console.log(`${event.type.replace("Event","")} in ${event.repo.name}`)
                break;
        }
    }
}


const username = process.argv[2];

if(username){
    getGitHubEvents(username)
    .then(events => displayEvents(events))
    .catch(error => console.log(error))
}else{
    console.log("Error: Write a username to search")
}
