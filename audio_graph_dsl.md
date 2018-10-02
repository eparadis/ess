# Defining a DSL for describing the audio graph
- Thin arrows are CVs  `-->`
- Thick arrows are audio  `==>`

# Example "filtered_noise.html"
```
LFO-->VCA1.gain
NOISE==>VCF==>VCA1==>VCA2==>OUT
slider1-->VCA2.gain
slider2-->VCF.freq
slider3-->VCF.q
```

- How to deal with identical modules? ie: VCA1 vs VCA2
- Is distinguishing between CVs and audio necessary?

# Aliases for disambiguation and typing
```
MIXER = VCA
slider1 = SLIDER
slider2 = SLIDER
slider3 = SLIDER
// LFO not required to be aliased because there is only one
// ditto VCA and NOISE
```

# Manual input ranges
```
volumeCtl = SLIDER(0,1)
freqCtl = SLIDER(0,10000)
```

# A more code-like syntax
```
volumeCtl = new Slider(0,1)
freqCtl = new Slider(1,10000)
qCtl = new Slider(0,10)
mixer = new VCA
noise = new Noise
vcf = new VCF
vca = new VCA
out = new OUT

lfo-->vca.gain
noise==>cf==>vca==>mixer==>out
volumeCtl-->mixer.gain
freqCtl-->vcf.freq
qCtl-->vcf.q
```
- This seems pretty chatty. What syntactical improvements could be made?
- Members of the audio graph with multiple outputs could use `modules.output1-->destination`
  as a way to indicate which output signal to route.
- Again, the distinction between audio paths and control voltage paths seems unnecessary. It
  is a simple way to highlight the "main" audio path to human readers.


