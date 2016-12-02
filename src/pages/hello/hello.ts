import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import * as FeedHenry from '@akeating-redhat/fh-js-sdk';


@Component({
  selector: 'page-home',
  templateUrl: 'hello.html'
})
export class HelloPage {

  private _inputText:string = "";
  private _labelText:string = "Nothing yet . . .";

  constructor(public navCtrl: NavController) {

  }

  /**
   * Get the current contents of the response label in the page.
   * 
   * @returns {string} - The current contents of the label.
   */
  get labelText():string {
    return this._labelText;
  }

  /**
   * Set the current contents of the response label in the page.
   * 
   * @param labelText {string} - The new text for the label.
   */
  set labelText(labelText:string) {
    if(labelText && labelText.length > 0) {
      this._labelText = labelText;
    } else {
      this._labelText = "Nothing yet . . ."
    }
  }

  /**
   * Get the current contents of the input in the page.
   * 
   * @returns {string} - The current contents of the input.
   */
  get inputText() {
    return this._inputText;
  }

  /**
   * Set the current contents of the input in the page.
   * 
   * @param inputText {string} - The new text for the input.
   */
  set inputText(inputText:string) {
    this._inputText = inputText;
  }

  /**
   * Perform the cloud call for the hello world functionality
   * and update the label with the response.
   */
  invokeCloudCall() {
    this.labelText = "Loading . . .";

    FeedHenry.cloud({
      path: "hello",
      data: {
        hello: this.inputText
      }
    },
    (data, status, xhr) => {
      this.labelText = data.msg;
    },
    (message, error) => {
      this.labelText = `An error occured: (${message}) - ${error}`
    });
  }
}
