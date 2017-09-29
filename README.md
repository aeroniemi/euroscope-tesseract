
# euroscope-tesseract
A Euroscope launcher

## Intentions

My reasons for making this are simple. Lots of VATSIM atc controllers are lazy when it comes to remembering to keep up to date with real world NOTAMs, and quite frequently don't have a clue what is open, closed, or active. Being in the BG training department, this is incredibly annoying. My market research suggests that the first reason that people don't bother is that it is "a lot of effort". Therefore, my aim is to make it so that a controller doesn't need to go out of their way to know about the info, and is simply presented with it on startup.

* display notams on startup
* allow for easier selection of sectorfiles (for people that have many)

### Americanisation?

Don't ask. It's not happening. No support will be provided for inferior measurements (inches of murcury; lbs, etc).  

### What actually works?

Currently, development is slow. However, if one was to use this now, the following things would work:
* using the config object within notamParser, search FAA AIMS for notams in ICAO format, and display these at the bottom of the home page. 
* Creates boxes for each FIR, and each notam airport on homepage
* ***That's about it***

### Potential future goals

* ability to autoupdate sectorfiles
* easier installation of aeronav sectorfiles


### Why tesseract

The tesseract is a pretty exciting, endless 4d shape. Also, it just sounds cool. Enough said.
