import { LightningElement, track,wire } from 'lwc';
import getTask from '@salesforce/apex/myToDoAppController.getToDoItems';
import insetNewTask from '@salesforce/apex/myToDoAppController.createToDoItem';
import updateTask from '@salesforce/apex/myToDoAppController.updateToDoItems';
import deleteTask from '@salesforce/apex/myToDoAppController.deleteToDoItem';

export default class MyToDoApp extends LightningElement {

 PriorityOptions = [
        { label: 'High', value: 'High' },
        { label: 'Medium', value: 'Medium' },
        { label: 'Low', value: 'Low' },
    ];

    @track taskName;
    @track description ;
    @track priority = 'Medium';
    @track isTaskAdded = false;


// MIN CODE TO CALL WIRE 
//@wire function 
@wire(getTask)
wiredTask({error,data}){
    if(data) this.taskName = data;
    if(error) console.error('Error fetching tasks:', error);
}

handleTask(event) { this.taskName = event.target.value.trim(); }
handleDesc(event) { this.description = event.target.value.trim(); }
handlePriority(event) { this.priority = event.target.value.trim();}
handleLearning(event) { this.TodayNewLearning__c = event.target.value.trim();}
handleDate(event) { this.Due_Date__c = event.target.vale.trim();}

async addTaskItem(){
    const newTask = {TaskName__c: this.taskName, Description__c	: this.description, Priority__c:this.priority}; 
    await insetNewTask({newTask});
    window.location.reload();
}

async handleComplete(event){
    const id = event.target.dataset.id;
    const task = this.taskName.find(t => t.Id === id);
    task[0].Status__c	 = 'Done';
    await updateTask({task});
    window.location.reload();
}

async handleDelete(event){
    await deleteTask({taskId: event.target.dataset.id});
    window.location.reload();
}

// JUST FOR PRACTICE PURPOSE LIFE CYCLE HOOKS
    constructor() {
        super();
        console.log('🔵 Constructor called');
    }

    connectedCallback(){
        console.log('🟢 connectedCallback called');
    }

    renderedCallback(){
        console.log('🟣 renderedCallback called');
    }

    disconnectedCallback(){
        console.log('🔴 disconnectedCallback called');
    }

    errorCallback(error, stack){
        console.log('⚫ errorCallback called'+error);
        console.log('⚫ errorCallback called'+stack);
    }
}