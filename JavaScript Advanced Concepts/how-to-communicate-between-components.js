/**
 * ---------------------------------------
 * How to communicate between Components
 * ---------------------------------------
 * 
 * Components are a tool for splitting the page in smaller pieces that are easier to manage and 
 * reuse. By breaking the page into smaller parts, we make their implementation simpler.
 * 
 * But at the same time this creates a new challenge: the communication between these small parts.
 * 
 * ------------
 * A showcase
 * ------------
 * I’ll take as an example a page managing a list of to-dos. The user is able to see, add, and 
 * search for to-dos.
 * 
 * -----------------------
 * Identifying components
 * -----------------------
 * We can split the page in three main components based on their responsibilities:
 *  - TodoAddForm: the form for adding a new to-do
 *  - TodoSearchForm: the form for searching a to-do
 *  - TodoList: the list for displaying the to-dos
 * 
 * We can go even further and make every item in the list have its own component: TodoListItem
 * 
 * For the sake of this analysis, I encapsulate the text-box and button in their own component: 
 * FormInput, FormButton.
 * 
 * ------------------------------------
 * Components are in a Tree Structure
 * ------------------------------------
 * Before analyzing how to communicate between components, we need understand that components are 
 * organized in a tree structure. If the framework doesn’t force a root component, then we’ll 
 * create one.
 * 
 * ---------------------------------------
 * Presentation and Container Components
 * ---------------------------------------
 * We can start defining the components’ responsibilities by using the Container and Presentational 
 * Pattern.
 * 
 * The pattern is described in Presentational and Container Components and Container Components
 * 
 * The presentation components communicate only through their own properties, methods, and events. 
 * They are not connected to external communication objects. This makes presentation components 
 * easier to understand and more reusable, as they are not coupled to other objects.
 * 
 * The container components are connected to external objects. They listen for events from these 
 * objects and do actions. They provide data to the user interface.
 * 
 * I’ll start with only one root container component: TodoContainer. All the other will be 
 * presentation components: TodoAddForm, TodoSearchForm, TodoList, TodoListItem , FormInput and 
 * FormButton.
 * 
 * ------------------------
 * Presentation Components
 * ------------------------
 * I’ll create the presentation components one by one, first in Vue and then in React.
 * 
 * FormButton Component
 * =====================
 * Vue
 * 
 * Let’s start with the implementation in Vue.
 * The component has a template and an object managing the UI logic:
 * 
          //Vue Component Template
          <button v-on:click="triggerClick" type="button">{{value}}</button>

          //Vue Component Logic
          function FormButton(args){
            return {
              props : ["value"],
              methods : {
                triggerClick : function(){
                  this.$emit("click");
                }
              }
            }
          }
 * 
 * Components using the FormButton need to know when the button is clicked. A simple solution is 
 * to trigger a click event. FormButton triggers a click event when the button is clicked: 
 * this.$emit("click") .
 * 
 * The child component communicates with its parent components by triggering events. The parent 
 * can catch these events and act on them.
 * 
 * React
 * 
 * Implementing the same component in React is a little bit different, as it uses event handlers. 
 * It turns out that it is even simpler to implement it in React as a stateless functional component.
 * 
 * With this occasion we also get rid of this:
 * 
          function FormButton(props) {
            return <button type="button" onClick={props.onClick}>{props.value}
            </button>;
          }
 * 
 * FormButton exposes the onClick event as a property. The parent should pass a callback as the 
 * event handler. The callback will be called when the button is clicked.
 * 
 * The child component communicates with its parent by calling callbacks. The parent sets the 
 * callbacks as properties on the child component.
 * 
 * FormInput Component
 * ====================
 * FormInput contains a simple text input. We need to expose a way for other components to read 
 * the text written in the FormInput component.
 * 
 * Vue
 * 
 * Vue supports two way binding by using the v-model property.
 * This is a shorthand for:
 *  - sending data to the component using the value property
 *  - reading data from the component by listening for the input event
 * 
              //Vue Component Template
              <input v-model="valueData" @change="triggerChange" />

              //Vue Component Logic
              function FormInput(args){
                return {
                  props : ["value"],
                  data: function() { 
                      return {
                        valueData : this.value
                      };
                  },
                  methods : {
                    triggerChange : function($event){
                      this.$emit('input', this.valueData);
                    }
                  }
                }
              }
 * 
 * As you can see, FormInput can get the data to be displayed from the value property. It triggers 
 * an input event every time the text changes (this.$emit(‘input’, this.valueData). Other 
 * components can use v-model to communicate with it.
 * 
 * Parent component can communicate with child component using the two-way binding. It needs to be 
 * supported by the component framework.
 * 
 * React
 * 
 * In React, the FormInput is a stateless functional component. Other components communicate with 
 * it, the same way we did before, by using event handlers.
 * 
            function FormInput(props) {
              return <input type="text" onChange={props.onChange} 
              value={props.value} />;
            }
 * 
 * TodoListItem Component
 * =======================
 * The TodoListItem is a very simple presentation component. It displays the todo received as a 
 * parameter.
 * 
 * Vue
 * 
 * Below is the code in Vue:
 * 
              //Vue Component Template

              <li>{{ todo.title }}</li>
              //Vue Component Logic
              function TodoListItem(args){
                return {
                  props : ["todo"]
                }
              }
 * 
 * React
 * 
 * Again, in React we can implement it as stateless functional component.
 * 
              function TodoListItem(props){
                return   <li>
                  { props.todo.title }
                </li>;
              }
 * 
 * TodoAddForm Presentation Component
 * ===================================
 * 
 * Vue
 * 
 * In Vue, TodoAddForm needs to read the text from FormInput and trigger a new event when 
 * FormButton is clicked. It reads the value from FormInput using two-way binding (v-model property).
 * 
 * TodoAddForm handles the FormButton's click event and triggers a new add event — 
 * this.$emit("add", todo):
 * 
                //Vue Component Template
                <form>
                <form-input v-model="title"/></form-input>
                <form-button v-on:click="add" value="Save"></form-button>
                </form>

                //Vue Component Logic
                function TodoAddForm(){
                  return {
                    data: function() { 
                        return {  title : "" }
                    },
                    methods : {
                      add : function(){
                        let todo = Object.freeze({ title: this.title });
                        this.$emit("add", todo);
                        this.title = "";
                      }
                    }
                  }
                }
 * 
 * React
 * 
 * In React, the TodoAddForm uses the handleChange to read the value from FormInput on every change.
 * It exposes its own event property onAddClick:
 * 
                class TodoAddForm extends React.Component {
                  componentWillMount() {
                    this.setState({title: ""});
                  }
                  
                  add() {
                    let todo = Object.freeze({ title: this.state.title });
                    this.props.onAddClick(todo);
                    this.setState({title: ""});
                  }
                  
                  handleChange(event) {
                    this.setState({title: event.target.value});
                  }
                  
                  render() {
                    return <form>
                <FormInput onChange={this.handleChange.bind(this)} value={this.state.title}></FormInput>
                <FormButton onClick={this.add.bind(this)} value="Save"></FormButton>
                    </form>;
                  }
                }
 * 
 * TodoSearchForm Presentation Component
 * ======================================
 * 
 * Vue
 * 
 * In Vue, TodoSearchForm reads the search text from the FormInput using the two-way binding system.
 * 
 * When FormButton is clicked, it triggers the search event with the new query:
 * 
                <form class="form">
                <form-input v-model="name"></form-input>
                <form-button v-on:click="search" value="Search"></form-button>
                </form>
                function TodoSearchForm(){
                  return {
                    data: function() { 
                      return { name : "" };
                    },
                    methods : {
                      search : function(){
                        let query = Object.freeze({ name: this.name });
                        this.$emit("search", query);
                      }
                    }
                  }
                }
 * 
 * React
 * 
 * In React, TodoSearchForm exposes onSearchClick event property.
 * 
 * The event handler will be called when the FormButton is clicked:
 * 
                class TodoSearchForm extends React.Component {
                  componentWillMount() {
                    this.setState({name: ""});
                  }
                  
                  search(){
                    let query = Object.freeze({ name: this.state.name });
                    this.props.onSearchClick(query);
                  }
                  
                  handleChange(event) {
                    this.setState({name: event.target.value});
                  }
                  
                  render() {
                    return <form>
                <FormInput onChange={this.handleChange.bind(this)} placeholder="Search ..." value={this.state.name}></FormInput>
                <FormButton onClick={this.search.bind(this)} value="Search"></FormButton>
                    </form>;
                  }
                }
 * 
 * TodoList Presentation Component
 * ================================
 * TodoList gets the list of todos to render using a property. At the same time it uses a property 
 * to send a todo to TodoListItem.
 * 
 * Vue
 * 
                //Vue Component Template
                <div id="todoList">
                <ul>
                  <todo-list-item v-for="todo in todos" :todo="todo" :key="todo.id">
                  </todo-list-item>
                </ul>
                </div>

                //Vue Component Logic
                function TodoList(){
                  return {
                    props: ["todos"]
                  }
                }
 * 
 * React
 * 
                class TodoList extends React.Component {
                  constructor(){
                    super();
                  }
                  
                  render() {
                    return <div id="todoList">
                      <ul>
                        {this.props.todos.map((todo) => (
                          <TodoListItem todo={todo} key={todo.id} ></TodoListItem>
                        ))}
                      </ul>
                    </div>;
                  }
                }
 * 
 * Parent communicates with child using the child’s properties.
 * 
 * -------------------
 * One Root Container
 * -------------------
 * Now, let’s take a look at the only container component: TodoContainer.
 * 
 * Vue
 * 
                //Vue Component Template
                <div>
                <todo-add-form @add="add"></todo-add-form>
                <todo-search-form @search="search"></todo-search-form>
                <todo-list :todos="todos"></todo-list>
                </div>

                //Vue Component Logic
                function TodoContainer(args){
                  let todoStore = args.todoStore;
                  
                  return {
                    data: function() { 
                        return {
                          todos : [],
                          query : { name : "" },
                          top : 10
                        };
                    },
                    created : function(){
                      todoStore.onChange(this.reload);
                      todoStore.fetch();
                    },
                    methods : {
                      reload : function(){
                        this.todos = todoStore.getTodos(this.query);
                      },
                      add : function(todo){
                        todoStore.add(todo);
                      },
                      search : function(query){
                        this.query = query;
                        this.reload();
                      }
                    }
                  }
                }
 * 
 * React
 * 
                function TodoContainer(args){
                  let todoStore = args.todoStore;
                  
                  return class TodoContainer extends React.Component {
                    componentWillMount(){
                      this.query = { name : ""};
                      this.top = 10;
                      this.setState({todos : []});
                    }
                    
                    componentDidMount() {
                      todoStore.onChange(this.reload);
                      todoStore.fetch();
                    }
                    
                    add(todo) {
                      todoStore.add(todo);
                    }
                    
                    search(query){
                      this.query = query;
                      this.reload();
                    }
                    
                    reload(){
                      let todos = todoStore.getTodos(this.query);
                      this.setState({ todos : todos });
                    }
                    
                    render() {
                      return <div>
                <TodoAddForm onAddClick={this.add} />
                <TodoSearchForm onSearchClick={this.search} />
                <TodoList todos={this.state.todos} />
                      </div>;
                    }
                  }
                }
 * 
 * I’ll analyze the functionalities one by one.
 * 
 * Rendering to-dos
 * ================
 * In order to display the to-dos, we need an object to give this data.
 * 
 * Domain Store
 * =============
 * The Domain Store keeps the domain state and does the synchronization with the server. The domain 
 * store is a publisher. It emits events every time its state changes. Components can subscribe 
 * to these events and update the user interface.
 * 
 * TodoStore is the domain store for managing to-dos. It is the single source of truth regarding 
 * to-dos.
 * 
 * TodoContainer uses TodoStore to get the data and then sends the to-dos down the tree using 
 * properties.
 * 
 * Adding to-dos
 * ==============
 * The TodoStore manages the to-dos. Adding a to-do is done using it.
 * 
 * The TodoStore emits events when a to-do is added. We need to subscribe to its change event and 
 * update the user interface.
 * 
 * Finding to-dos
 * ===============
 * TodoContainer handles the search event from the TodoSearchForm . It creates a new filtered list 
 * using TodoStore and then sends the list to the TodoList component.
 * 
 * TodoContainer keeps all the UI state, the query object in this case.
 * 
 * Data Flow
 * ==========
 * Now let’s analyze how data flows in this tree structure.
 * 
 * When adding, the data flows from FormInput → TodoAddForm → TodoContainer . At the end TodoContainer 
 * adds the to-do using TodoStore .
 * 
 * When searching, the data goes from FormInput → TodoSearhForm → TodoContainer. At the end, 
 * TodoContainer gets the new to-dos from TodoStore using the new query .
 * 
 * When rendering the list, the data goes down the tree from TodoContainer → TodoList → TodoListItem.
 * 
 * ----------------------
 * Many Mixed Components
 * ----------------------
 * Next, I’ll take a new approach and split all responsibilities of the TodoContainer :
 *  - TodoAddForm: adds to-dos using using TodoStore
 *  - TodoList: does data fetching using TodoStore
 *  - TodoSearchForm: communicates with TodoList using a new kind of store
 * 
 * All three components are now mixed components. Mixed components are connected to external 
 * objects and have their own HTML. In this case the HTML is trivial, so I don’t see the necessity 
 * of splitting the mixed components in presentation and container components.
 * 
 * After refactoring out all these responsibilities, the root component has a simple render 
 * responsibility.
 * 
 * Vue
 * 
                <div>
                <todo-add-form></todo-add-form>
                <todo-search-form></todo-search-form>
                <todo-list></todo-list>
                </div>
 * 
 * React
 * 
                function TodoRootComponent(components){ 
                  return class Root extends React.Component {
                    render() {
                      return <div>
                          <TodoAddForm />
                          <TodoSearchForm />
                          <TodoList />
                        </div>;
                    }
                  }
                }
 * 
 * TodoList Mixed Component
 * =========================
 * TodoList listens for events from TodoStore and updates the UI.
 * 
 * Vue
 * 
                //Vue Component Logic
                function TodoList(args){
                  let todoStore = args.todoStore;
                  
                  return {
                    created : function(){
                      todoStore.onChange(this.reload);
                      todoStore.fetch();
                    },
                    methods : {
                      reload : function(){
                        this.todos = todoStore.getTodos();
                      }
                    }
                  }
                }
 * 
 * React
 * 
                //React Component Logic
                function TodoList(args){
                  let todoStore = args.todoStore;
                  
                  return class TodoList extends React.Component {
                    componentDidMount() {
                      todoStore.onChange(this.reload.bind(this));
                      todoStore.fetch();
                    }
                    
                    reload(){
                      let todos = todoStore.getTodos();
                      this.setState({ todos : todos });
                    }
                    
                    render() { }
                  }
                }
 * 
 * TodoAddForm Mixed Component
 * ============================
 * TodoAddForm uses TodoStore to add a new to-do.
 * 
 * Vue
 * 
                //Vue Component Template
                <form>
                <form-input v-model="todo.title"></form-input>
                <form-button v-on:click="add" value="Save"></form-button>
                </form>

                //Vue Component Logic
                function TodoAddForm(args){
                  "use strict";
                  let todoStore = args.todoStore;
                  
                  return {
                    methods : {
                      add : function(){
                        let todo = Object.freeze({ title: this.todo.title });
                        todoStore.add(todo);
                      }
                    }
                  }
                };
 * 
 * React
 * 
                function TodoAddForm(args){
                  "use strict";
                  let todoStore = args.todoStore;
                  
                  return class TodoAddForm extends React.Component {    
                    add() {
                      let todo = Object.freeze({ title: this.state.title });
                      todoStore.add(todo);
                    }
                    
                    render() {
                      return <form>
                <FormInput onChange={this.handleChange.bind(this)} 
                value={this.state.title}></FormInput>
                <FormButton onClick={this.add.bind(this)} value="Save"></FormButton>
                      </form>;
                    }
                  }
                }
 * 
 * Then the question is how TodoList knows about the new to-do and updates the user interface. The 
 * TodoStore is the publisher. It emits events whenever a to-do is added. TodoList subscribes to 
 * TodoStore change event to update the interface.
 * 
 * Components communicate domain-related changes using the domain store.
 * 
 * TodoSearchForm Mixed Component
 * ===============================
 * Let’s take the case of finding a to-do. This time, we can’t use the TodoStore to communicate 
 * between components. The domain store keeps data that is synchronized with the server. The search 
 * query is a UI related state, not something that should be synchronized with the server. We need 
 * a new kind of store.
 * 
 * UI Store
 * =========
 * The UI Store keeps state related to UI. It is a simple store with not too much logic in it. There 
 * is only one UI store per page. It notifies subscribers when its state changes.
 * 
 * Below is a simple UI Store implemented using getters and setters:
 * 
              function UIStore(args){
                let subscribers = [];
                let todoQueryValue = { name : "" };
                let store = {
                  get todoQuery() {
                    return todoQueryValue;
                  },
                  set todoQuery(value) {
                    todoQueryValue = value;
                    notify();
                  }
                };
                
                store.onChange = function(property, callback){
                  subscribers.push(callback);
                }
                
                function notifySubscriber(fn){
                  fn(store);
                }
                
                function notify(){
                  subscribers.forEach(notifySubscriber);
                }
              return Object.freeze(store);
              }
 * 
 * The TodoSearchForm modifies the todoQuery on the UIStore.
 * 
 * Vue
 * 
              function TodoSearchForm(args){
                "use strict";
                let uiStore = args.uiStore;
                
                return {
                  methods : {
                    search : function(){
                      uiStore.todoQuery =  Object.freeze({ name: this.name });
                    }
                  }
                }
              };
 * 
 * React
 * 
              function TodoSearchForm(args){
                let uiStore = args.uiStore;
                
                return class TodoSearchForm extends React.Component {   
                  search(){
                    uiStore.todoQuery = Object.freeze({ name: this.name.value });
                  }
                }
              }
 * 
 * The TodoList subscribes to UIStore change events and updates the UI when todoQuery changes. The 
 * TodoList uses theUIStore whenever it needs the current value of the todoQuery.
 * 
 * Vue
 * 
            function TodoList(args){
              "use strict";
              let uiStore = args.uiStore;
              
              return {
                created : function(){
                  uiStore.onChange("todoQuery", this.reload);
                },
                methods : {
                  reload : function(){
                    this.todos = todoStore.getTodos(uiStore.todoQuery);
                  }
                }
              }
            }
 * 
 * React
 * 
            function TodoList(args){
              let uiStore = args.uiStore;
              
              return class TodoList extends React.Component {
                componentDidMount() {
                  uiStore.onChange("todoQuery", this.reload.bind(this));
                }
                
                reload(){
                  let todos = todoStore.getTodos(uiStore.todoQuery);
                  this.setState({ todos : todos });
                }
              }
            }
 * 
 * Components communicate UI related changes using the UI store.
 * 
 * Data Flow
 * ==========
 * Let’s see how data flows in this tree structure.
 * 
 * When adding, the data flows from FormInput → TodoAddForm. The TodoAddForm adds the to-do using 
 * TodoStore .
 * 
 * When searching, the data goes from FormInput → TodoSearhForm. The TodoSearchForm changes the 
 * query on the UIStore.
 * 
 * The TodoList listens for change events from both TodoStore and UIStore. When rendering the list, 
 * the data goes down the tree from TodoList → TodoListItem.
 * 
 * -----------------
 * Global Event Bus
 * -----------------
 * Another tool at our disposal for communication is the Global Event Bus. The global event bus is 
 * everywhere, hidden under different names like:
 * 
              $(document).trigger() / $(document).on() in jQuery
              amplify.publish() / amplify.subscribe() with AmplifyJs
              $rootScope.$emit() / $rootScope.$on() in AngularJs
              this.$root.$emit() / this.$root.$on() in VueJs
              or any shared(global) object with a publish/scribe API
 * 
 * The global event bus can communicate with everything : any component, any object in any layer. 
 * This is why we need to put a limitation on its usage.
 * 
 * I suggest to use the global event bus as the last resort. Take first into consideration : 
 * properties, methods, events, domain store, and UI store.
 * 
 * Components can communicate using the global event bus if there is no better alternative.
 * 
 * ---------------
 * Don’t do that!
 * ---------------
 * There are, of course, dirty ways to communicate between components.
 * 
 * Let’s take the case of two components — A and B:
 *  a shared(global) object allComponents contains references to both A and B
 * 
 * A can say allComponents.B.doSomething()
 *  Don’t do this kind of communication. You create coupling. Component A should not know about 
 * component B, unless it’s the child.
 * 
 */