---
layout: page
title: The technology behind Strange Phone
permalink: /tech/
menu: False
footer_menu: True
---

The tech behind Strange Phone is pretty simple. Three parts: Front end (this site), physical POTS phone system and the VOIP backend.  I have been planning this project in my head since i registered the strangephone.com domain in January 2006. 

## Front end

The frontend is powered by jekyll and some javascript. It is very simple. The instagram integration is powered by instafeed. I have used it a handful of times and it is a very simple way to integrate your instagram into your website. 

You can check out the code that powers this site on [github](https://github.com/harperreed/strangephone.com). Make a pull request. Fix something. Make it better! 

## the POTS phone system

The POTS phone line is powered by an [Obihai](https://en.wikipedia.org/wiki/Obihai_Technology) [ATA](https://en.wikipedia.org/wiki/Analog_telephone_adapter). In laypeople terms, this is hardware device that plugs into ethernet and translates internet VOIP into a [POTS](https://en.wikipedia.org/wiki/Plain_old_telephone_service) phone line. 

The payphone is powered by a standard land line. The obihai outputs a standard landline and I run that directly to the [Payphone](https://en.wikipedia.org/wiki/Payphone#United_States). 

I have been pretty happy with the Obihai devices. They are simple to install and the newer ones support wifi with an adapter. You just need to have voip credentials so that you can make and receive calls. 

## VOIP

I am using a small amount of stacking to make this work like i want it. 

First off, I used [Sipsorcery](http://sipsorcery.com) as the main sip account. The Obihai ATA logs into the Sipsorcery account. Sipsorcery supports many VOIP providers and has advanced dialplan support. This allows me to have a lot of flexibility with my dialing. If you haven't used Sipsorcery before you are in for a treat. 

Sipsorcery connects uses twilio as a SIP trunk. 

I am then able to use my twilio numbers for dialing out and receiving incoming calls. 

Since twilio is all XML and URL based for routing, I needed to cobble together some scripts to help guide my phone numbers and sip calls. This was pretty easy after googling for awhile. I will post the scripts in the github shortly. 

## WiP

This is obviously a work in progress. It is partially a prank on myself. Something physical that is also technology that is also a phone that is also super annoying if it worked really well. 

I look forward to seeing how this system maintains and how well it works. 

### Next steps

* post all the calls that are made to or from the payphone. 
* take advantage of twilios advanced sip features

----

I would love to hear your thoughts on this - feel free to hit me up on [twitter](https://twitter.com/intent/tweet?in_reply_to=877695400760705024&related=harper&text=I+have+a+comment+about+this+strange+payphones?) or [email me](mailto:harper@nata2.org). 

