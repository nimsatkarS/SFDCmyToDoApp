public with sharing class myToDoAppController {
    
    @AuraEnabled(cacheable=true)

    public static List<ToDo__c> getToDoItems(){
     return [SELECT Id,Name, TaskName__c, Description__c, Priority__c, Status__c FROM ToDo__c ORDER BY CreatedDate DESC];
    }

    //Create New Task
    @AuraEnabled 
    public static ToDo__c createToDoItem(ToDo__c newTask){
        insert newTask;
        return newTask;
    }

    //Update Task
    @AuraEnabled
    public static void updateToDoItems(ToDo__c updatedTask){
        update updatedTask;

    }

    //Delete Task
    @AuraEnabled
    public static void deleteToDoItem(Id taskId){
        delete[SELECT Id FROM ToDo__c WHERE Id = :taskId];
    }
}