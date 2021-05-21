# MMM-Ethermine_Info
A <a href="https://github.com/MichMich/MagicMirror">MagicMirror</a> module that shows your current Ethermine stats.

## Installation
1. Navigate into your MagicMirror's `modules` folder using `cd MagicMirror/modules/`
2. Clone the module using `git clone https://github.com/Schreipfelerer/MMM-EthermineInfo.git`.
3. Add the module inside `config.js`

## Config

|Option|Description|
|---|---|
|`minerAdress`|MANDATORY: The Etherium adress of the wallet the miner is mining to.<br>**Type:** `string`|
|`updateInterval`|Frequency, in milliseconds, to update the module<br>**Type:** `number` <br> **Default** <i>1000</i>|
|`fetchIntervall`|Frequency, in milliseconds, to fetch new data.<br>**Type:** `number` <br> **Default** <i>120000</i>|
|`showHeader`|Specefies wether a header should be shown or not.<br>**Type:** `boolean`<br> **Default** <i>true</i> |
|`headerText`|The Text which is shown in the header. You can use `%miner` to reference your minerAdress.<br> **Type** `string` <br> **Default** <i>Ethermine Stats for %miner</i> |
|`fontSize`| Dimension of price text. You can specify pixel values, em values or keywords.<br> **Type:** `string` <br>**Options:** `xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large` <br> **Default** <i>xx-large</i> |


Here is an example of an entry in `config.js`
```
{
	module: "MMM-EthermineInfo",
	position: "bottom_right",
	config: {
		minerAdress: "YOUR ADRESS",
        fontSize: "large"
	}
}
```

## Screenshot
![Screenshot of working module](/Info.png?raw=true "Example screenshot")

## Notes
This module uses the Ethermine <a href="https://ethermine.org/api/pool">API</a>.
- The API does not require a Key
- Endpoints update every 2 minutes.
- The API is limited to 100 requests / 15 minutes / IP

## Feedback
It's my first module here after that I built a MagicMirror. It also is the first Time i used javascript in gerneral.
<br>Since i dindt know where to start i used the <a href="https://github.com/matteodanelli/MMM-cryptocurrency">MMM-cryptocurrency</a> module as a guideline.
<br>I am open to work on this project and to expand it to add other interesting features, and a bit of cool style too.
<br>Leave me some feedback in the forum. Thank you!


## License
The MIT License (MIT)
=====================

Copyright © 2021 Schreipfelerer

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability,
fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability,
whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
