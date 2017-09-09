So ist das ganze entstanden:

unzip ../IST_2014_Entwurf.zip 
shp2pgsql -s 32632:4326 IST_2014_Entwurf.shp ist2014f >/tmp/ist.sql
su - postgres -c '/usr/bin/psql gis </tmp/ist.sql'

wget http://daten-hamburg.de/geographie_geologie_geobasisdaten/ALKIS_Adressen/ALKIS_Adressen_HH_2016-09.zip
unzip ../ALKIS_Adressen_HH_2016-09.zip 

ogr2ogr -f "ESRI Shapefile" mydata.shp Adressen.gml
shp2pgsql -W latin1 -s 32632:4326 mydata.shp alkis_adr >/tmp/adr.sql
su - postgres -c '/usr/bin/psql gis </tmp/adr.sql'

su - postgres -c '/usr/bin/psql gis '
COPY(select adr.strname,adr.hausnr,adr.zusatz, v.bezirk_name, v.stadtteil, ST_AsText(adr.geom), i.id, i.gno2_mk , ST_Distance(ST_Transform(adr.geom, 3857), ST_Transform(i.geom, 3857)) from verwaltungsgrenzen v, alkis_adr adr , ist2014f i where gno2_mk>40 and ST_Distance(ST_Transform(adr.geom, 3857), ST_Transform(i.geom, 3857))<30 AND ST_Within(adr.geom, v.wkb_geometry)) To '/tmp/output2.csv' With CSV;
