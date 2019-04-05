# Webchat Plugins
With Cognigy 3.3 you have the ability to include any software plugins in your webchat. 

We distinguish two types of plugins:
* **input** 
* **message**

The first ones are displayed in the input bar of your webchat, such as the **Send** or **Microphone** button. The second are displayed as a text message written by the Cognigy Bot. 

# Contents
* Message Plugins
	* Examples
		* Simple Plugin
		* Return JSX
		* Get Cognigy Webchat Style
		* Fullscreen Plugin


### Message Plugins
If you want to develop your own message plugin you have to follow these steps: 
* Create a folder and name it like your plugin
* Create a file called **index.tsx** 
	* You don’t have to use Typescript at this point but we recommend using it 
* Write your awesome plugin

#### Examples

##### Simple Plugin
There are various possibilities to develop and design a plugin, but the easiest way is to write a **React JS** constant and use these rows of code in your file:
```javascript
import * as React from 'react';
import { registerMessagePlugin } from "../../helper";

const PluginConst = (props) => {
  
	  return (
        <div></div>
    );
}

const yourPlugin = {
    match: 'your-plugin-string',
    component: PluginConst
}
registerMessagePlugin(yourPlugin);
```

The second import  `import ... from "../../helper"`  uses the **registerMessagePlugin()** method to put your plugin into the webchat. As a parameter it needs a object of your plugin where the **match** key is the string and the **component** the const/class of your plugin — more in section **Open Plugin in Cognigy.AI**

##### Return JSX
Such as always, you have to return your [JSX](https://reactjs.org/docs/introducing-jsx.html)  code who looks like HTML but is translated to Javascript in the background. You could for example return a simple button which sends a message in the name of the user: 
```javascript
const { onSendMessage } = props;

const handleClick = () => {
	onSendMessage('I clicked the button')
}

return (
	<button onClick={ handleClick }>Click me!</button>
);
```

If the user clicks the button which is displayed by the plugin, the user writes the message _I clicked the button_. 

The method **onSendMessage()** is passed as a props parameter and is used to send a message in the name of the user back to the webchat.

##### Get Cognigy Webchat Style
Since the design is an important part, you can use the webchat’s styles in your plugin, such as the primary color. Therefore you have to import [message plugins](https://github.com/Cognigy/Clients/blob/master/packages/webchat/src/common/interfaces/message-plugin.ts) from the Cognigy interfaces: 
```javascript
import { MessageComponentProps, MessagePluginFactory } from "../../../common/interfaces/message-plugin";
```

Now you have to define a styled constant as your main part: 
```javascript
const yourStyledPlugin = ({ styled }) => {

	// style your plugin components here

  class YouPlugin extends React.Component {
		// write your plugin code here
		render() {
			return(
				<div></div>
			);
		}
	}
}

registerMessagePlugin(yourStyledPlugin);
export default yourStyledPlugin;
```

The constant **yourStyledPlugin** gets the **styled** property and uses the **MessagePluginFactory**.

If you want to give your plugin’s button the style of your whole webchat, you can easily define a new component: 
```javascript
// style your plugin components here
const PrimaryButton = styled.button(({ theme }) => ({
    background: theme.primaryColor,
    color: theme.primaryContrastColor,
    padding: `${theme.unitSize * 2}px ${theme.unitSize * 3}px`,
}));
```

The theme gives you various style options, such as **primaryColor** or **primaryContrastColor** to design your components straight forward. 
The code `theme.unitSize * 2` is used to take advantage of the theme’s style for scaling reasons. Therefore your plugin scales automatically in the webchat’s window. We highly recommend using these **unitSizes** in your code to always offer a perfect design. After this, you can use the new component **PrimaryButton** in your **render()** method: 
```javascript
render() {
	return (
		<PrimaryButton>Click me!</PrimaryButton>
	);
}
```

##### Fullscreen Plugin
Until now, the plugin only renders a simple button but for some reasons it should render a fullscreen plugin, such as the Date/- or Flightseatpicker. The only important thing is, that the user should for example click on a button to open the fullscreen plugin since you should offer the possibility to write the answer as a message — in the Datepicker the user can open the picker or write the whished date.

For this you can use the property method **onSetFullscreen** which could be called by the **PrimaryButton** at the **onClick** event.
```javascript
const { onSetFullcreen } = this.props;

render() {
	return (
		<Primarybutton onClick={onSetFullscreen}>Click me!</PrimaryButton>
	);
}
```

###### Advanced
If you want to check if the plugin currently is in fullscreen mode, you can use the boolean property **isFullscreen**: 
```javascript
const { isFullscreen } = this.props;

if (isFullscreen) {
	console.log("is fullscreen");
}else{
	console.log("is not fullscreen");
}
```