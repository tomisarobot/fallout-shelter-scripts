# fallout-shelter-scripts

Few scripts for understanding fallout shelter dwellers

### calc-health-potential

Calculates what health dwellers could potentially reach if they were leveled up with different endurance stats.

| opcXX | opportunity cost if levelled with this effective endurance |
| eXX | final health if leveled with effective endurance |
| spsum | special sum including gear |
| sbsum | special sum excluding gear |
| grade | put potential health into easier to read buckets based on leveling with e17 e15 e13 |

```
id   name              health   level  grade     opc15  opc13  opc10  spsum  sbsum  SPECIAL   e10    e13     e15    e17
131  Harry Powell      149      12     BB-BD-CA  38     38     57     29     26     2A31127   434    491     529    567
128  Maria Wood        149      12     BB-BD-CA  38     38     57     23     20     11322A1   434    491     529    567
139  Gary Thompson     170      11     BA-BB-BD  39     39     58     27     24     22A1117   462.5  521     560    599
147  Carolyn Thompson  180      11     AE-BB-BD  39     39     58     22     19     21A1212   472.5  531     570    609
129  Paul Taylor       135      11     BB-BD-CA  39     39     58     32     29     2A1222A   427.5  486     525    564
132  Hannah Davis      140      11     BB-BD-CA  39     39     58     44     41     1AA1A54   432.5  491     530    569
137  Eugene Powell     151.5    10     BA-BC-BE  40     40     60     31     28     1AA2221   451.5  511.5   551.5  591.5
144  Jack Powell       186      10     AD-BA-BC  40     40     60     22     19     22A2111   486    546     586    626
153  Dylan Thompson    125      6      AE-BB-BD  44     44     66     23     20     2A32111   455    521     565    609
151  Johnny Newton     105      1      AC-BA-BC  49     49     73     26     23     A242122   472.5  546     595    644
```

### vault-decrypt.js

Decrypts `Vault.sav` file into a `Vault.sav.json` file.
