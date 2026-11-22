import numpy as np, json
from skimage import morphology, measure
from scipy import ndimage as ndi
strokes=np.load('strokes2.npy'); sil=np.load('sil2.npy')
c=479.5; W=sil.shape[1]; xs_=np.arange(W); mx=np.clip(np.round(2*c-xs_).astype(int),0,W-1)
sil=sil & sil[:,mx]
sil=morphology.opening(sil, morphology.disk(3))
strokes=strokes & morphology.dilation(sil, morphology.disk(7))
dt=ndi.distance_transform_edt(strokes)
sk=morphology.skeletonize(strokes)
nb=[(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]
pts=set(zip(*np.where(sk)))
def neigh(p): return [(p[0]+dy,p[1]+dx) for dy,dx in nb if (p[0]+dy,p[1]+dx) in pts]
deg={p:len(neigh(p)) for p in pts}
nodes={p for p in pts if deg[p]!=2}
visited=set(); paths=[]
E=lambda a,b:(min(a,b),max(a,b))
def walk(a,b):
    path=[a,b]; prev,cur=a,b
    while cur not in nodes:
        nx=[q for q in neigh(cur) if q!=prev and E(cur,q) not in visited]
        if not nx: break
        q=nx[0]; visited.add(E(cur,q)); prev,cur=cur,q; path.append(cur)
        if cur==a: break
    return path
for n in nodes:
    for q in neigh(n):
        if E(n,q) in visited: continue
        visited.add(E(n,q)); paths.append(walk(n,q))
rest={p for p in pts if p not in nodes and all(E(p,q) not in visited for q in neigh(p))}
while rest:
    s=rest.pop(); nq=neigh(s)
    if not nq: continue
    q=nq[0]; visited.add(E(s,q)); pth=walk(s,q); paths.append(pth); rest-=set(pth)
def rdp(P,eps):
    if len(P)<3: return P
    a=np.array(P[0],float); b=np.array(P[-1],float); d=b-a; n=np.hypot(*d); arr=np.array(P,float)-a
    dist=np.abs(d[0]*arr[:,1]-d[1]*arr[:,0])/n if n>0 else np.hypot(arr[:,0],arr[:,1])
    i=int(np.argmax(dist))
    if dist[i]>eps: return rdp(P[:i+1],eps)[:-1]+rdp(P[i:],eps)
    return [P[0],P[-1]]
plen=lambda P: sum(np.hypot(P[i+1][0]-P[i][0],P[i+1][1]-P[i][1]) for i in range(len(P)-1))
sdt0=ndi.distance_transform_edt(sil)
sdt0=ndi.distance_transform_edt(morphology.dilation(sil, morphology.disk(8)))
paths=[p for p in paths if plen(p)>=6 and sum(1 for q in p if sdt0[q]>0)>=0.8*len(p)]
print('paths', len(paths))
ys,xs=np.where(sil); pad=8
x0,y0=xs.min()-pad, ys.min()-pad; w=xs.max()-xs.min()+2*pad; h=ys.max()-ys.min()+2*pad
def smooth_d(P):
    P=[(x-x0,y-y0) for (y,x) in P]
    if len(P)==2: return "M%.1f %.1f L%.1f %.1f"%(P[0]+P[1])
    d="M%.1f %.1f"%P[0]
    for i in range(len(P)-1):
        p0=P[i-1] if i>0 else P[i]; p1=P[i]; p2=P[i+1]; p3=P[i+2] if i+2<len(P) else P[i+1]
        c1=(p1[0]+(p2[0]-p0[0])/6, p1[1]+(p2[1]-p0[1])/6); c2=(p2[0]-(p3[0]-p1[0])/6, p2[1]-(p3[1]-p1[1])/6)
        d+=" C%.1f %.1f %.1f %.1f %.1f %.1f"%(c1+c2+p2)
    return d
sdt=ndi.distance_transform_edt(sil)
out=[(sdt[p[len(p)//2]], smooth_d(rdp(p,1.1))) for p in paths]
out.sort(key=lambda t:t[0])
sw=2*np.median(dt[sk & (dt>=2.0)])
cs=measure.find_contours(sil.astype(float),0.5); c=max(cs,key=len)
cq=rdp([tuple(v) for v in c],1.2)
hole="M"+" L".join("%.1f %.1f"%(x-x0,y-y0) for (y,x) in cq)+" Z"
cy,cx=ndi.center_of_mass(sil); r=sdt[int(cy),int(cx)]
print('size',w,h,'centre',round(cx-x0,1),round(cy-y0,1),'r',round(r,1),'sw',round(sw,2),'hole pts',len(cq))
from skimage.filters import gaussian
sm=gaussian(strokes.astype(float),0.8)>0.5
ink=[]
for cc in measure.find_contours(np.pad(sm,1).astype(float),0.5):
    if len(cc)<8: continue
    q=rdp([tuple(v) for v in cc],0.55)
    ink.append("M"+" L".join("%.1f %.1f"%(x-1-x0,y-1-y0) for (y,x) in q)+"Z")
ink_d=" ".join(ink)
print('ink KB', len(ink_d)//1024)
json.dump({'ink':ink_d,'w':int(w),'h':int(h),'cx':float(cx-x0),'cy':float(cy-y0),'r':float(r),'sw':float(sw),'hole':hole,'paths':[d for _,d in out]},open('brain.json','w'))
print('json KB', len(open('brain.json').read())//1024)
