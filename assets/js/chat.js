
var socket = io.connect('http://localhost:4200');

document.getElementById('chat-form').addEventListener('submit', (e)=>{

    e.preventDefault();

    const textInput = document.getElementById('chat-bar').value;
    const receiver = document.getElementById('chat-receiver').value;
    document.getElementById('chat-bar').value = '';

    // Si la valeur > 0, on envoie un message au serveur contenant la valeur de l'input 
    if(textInput.length > 0) {

        socket.emit('newMessage', textInput, receiver);
        createElementFunction('selfMessage', textInput)

    } else {
        return false;
    } 
});

function createElementFunction(element, content) {
    
    const newElement = document.createElement("div");

    switch(element){

        case 'selfMessage':
            newElement.classList.add(element, 'message');
            newElement.innerHTML = content;
            document.getElementById('chat').appendChild(newElement);
            break;
            
            
        case 'receiveMessage':
            newElement.classList.add(element, 'message');
            newElement.innerHTML = content.content;
            document.getElementById('chat').appendChild(newElement);
            break;

        case 'loadMessages':
            if(element.receiver == receiver){
                newElement.classList.add('selfMessage', 'message'); 

            }else {
                newElement.classList.add('responseMessage', 'message');
            }
            newElement.textContent = content.content;
            document.getElementById('chat').appendChild(newElement);
            break;
    }
}

//receptions
socket.on('newMessage',(content) => {
    createElementFunction('receiveMessage', content);
});


socket.on('loadMessages',(messages)=> {
    messages.forEach(message=>{
        createElementFunction('loadMessages', messages);
    })
})