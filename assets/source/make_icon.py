import math
def petal(cx,cy,rot,length,width,fill,stroke):
    l,w=length,width
    d=f"M0 0 C {-w} {-l*0.3}, {-w*0.9} {-l*0.8}, 0 {-l} C {w*0.9} {-l*0.8}, {w} {-l*0.3}, 0 0 Z"
    return f'<path d="{d}" transform="translate({cx} {cy}) rotate({rot})" fill="{fill}" stroke="{stroke}" stroke-width="5" stroke-linejoin="round"/>'

def art(mono=False):
    g=[]
    W='#FFFFFF'
    # halo rings
    if not mono:
        g.append('<circle cx="512" cy="470" r="330" fill="url(#halo)"/>')
        g.append('<circle cx="512" cy="470" r="318" fill="none" stroke="#E9C46A" stroke-width="6" opacity="0.85"/>')
        g.append('<circle cx="512" cy="470" r="292" fill="none" stroke="#E9C46A" stroke-width="3" stroke-dasharray="2 16" stroke-linecap="round" opacity="0.8"/>')
        for i in range(16):
            a=i*22.5+11.25
            g.append(f'<path d="M504 132 L512 70 L520 132 Z" fill="#F2D28A" transform="rotate({a} 512 470)" opacity="0.55"/>')
    # feather shaft
    g.append(f'<path d="M512 742 C 506 640, 518 560, 512 470" stroke="{W if mono else "#F3D27A"}" stroke-width="10" fill="none" stroke-linecap="round"/>')
    # feather barbs (fine strands)
    if not mono:
        for i in range(14):
            y=700-i*18; s=60+i*7
            g.append(f'<path d="M512 {y} q {-s*0.6} {-s*0.25} {-s} {-s*0.55}" stroke="#3FAE7A" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.75"/>')
            g.append(f'<path d="M512 {y} q {s*0.6} {-s*0.25} {s} {-s*0.55}" stroke="#3FAE7A" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.75"/>')
    # feather eye
    eye=[(150,205,'url(#fGreen)'),(112,160,'url(#fGold)'),(84,124,'#1EA5A0'),(58,88,'url(#fBlue)')]
    for i,(rx,ry,fill) in enumerate(eye):
        cy=380+ (205-ry)*0.55
        if mono:
            if i==0: g.append(f'<path d="M512 {cy-ry} C {512+rx*1.1} {cy-ry*0.55}, {512+rx} {cy+ry*0.75}, 512 {cy+ry} C {512-rx} {cy+ry*0.75}, {512-rx*1.1} {cy-ry*0.55}, 512 {cy-ry} Z" fill="{W}"/>')
            continue
        g.append(f'<path d="M512 {cy-ry} C {512+rx*1.1} {cy-ry*0.55}, {512+rx} {cy+ry*0.75}, 512 {cy+ry} C {512-rx} {cy+ry*0.75}, {512-rx*1.1} {cy-ry*0.55}, 512 {cy-ry} Z" fill="{fill}"/>')
    if not mono:
        g.append('<ellipse cx="500" cy="420" rx="14" ry="22" fill="#FFFFFF" opacity="0.35"/>')
    # lotus
    gold='url(#lotus)' if not mono else W
    st='#8A5A12' if not mono else W
    for rot,l,w in [(-78,150,46),(78,150,46),(-52,175,52),(52,175,52)]:
        g.append(petal(512,780,rot,l,w,'url(#lotusBack)' if not mono else W,st))
    for rot,l,w in [(-26,200,58),(26,200,58)]:
        g.append(petal(512,782,rot,l,w,gold,st))
    g.append(petal(512,784,0,215,62,gold,st))
    # base
    g.append(f'<path d="M352 800 Q 512 850 672 800" stroke="{W if mono else "#E9C46A"}" stroke-width="10" fill="none" stroke-linecap="round"/>')
    return "\n".join(g)

DEFS='''<defs>
<radialGradient id="bg" cx="0.5" cy="0.42" r="0.72"><stop offset="0" stop-color="#34459E"/><stop offset="0.55" stop-color="#17205A"/><stop offset="1" stop-color="#0A0F2E"/></radialGradient>
<radialGradient id="halo" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFE7A8" stop-opacity="0.55"/><stop offset="0.6" stop-color="#F2B56B" stop-opacity="0.18"/><stop offset="1" stop-color="#F2B56B" stop-opacity="0"/></radialGradient>
<linearGradient id="fGreen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5CC98C"/><stop offset="1" stop-color="#1F7A55"/></linearGradient>
<linearGradient id="fGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE08A"/><stop offset="1" stop-color="#D99A2B"/></linearGradient>
<radialGradient id="fBlue" cx="0.45" cy="0.4" r="0.6"><stop offset="0" stop-color="#3C5BD6"/><stop offset="1" stop-color="#14206E"/></radialGradient>
<linearGradient id="lotus" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF0C2"/><stop offset="0.55" stop-color="#F2C25C"/><stop offset="1" stop-color="#C9801F"/></linearGradient>
<linearGradient id="lotusBack" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7B27A"/><stop offset="1" stop-color="#C2531B"/></linearGradient>
</defs>'''

def svg(content,bg=True,scale=1.0,size=1024,round_=False):
    t=f'translate({512-512*scale} {500-512*scale}) scale({scale})' if scale!=1 else 'translate(0 22)'
    b='<rect width="1024" height="1024" fill="url(#bg)"/>' if bg else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" viewBox="0 0 1024 1024">{DEFS}{b}<g transform="{t}">{content}</g></svg>'

open('icon.svg','w').write(svg(art()))
open('fg.svg','w').write(svg(art(),bg=False,scale=0.72))
open('mono.svg','w').write(svg(art(mono=True),bg=False,scale=0.72))
open('splash.svg','w').write(svg(art(),bg=False,scale=0.95))
open('bg.svg','w').write(svg('',bg=True))
for n in ['icon','fg','mono','splash','bg']:
    open(n+'.html','w').write(f'<html><body style="margin:0;background:transparent">{open(n+".svg").read()}</body></html>')
