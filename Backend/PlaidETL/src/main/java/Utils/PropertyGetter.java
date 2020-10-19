package Utils;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertyGetter {

    private InputStream inputStream;

    public PropertyGetter(){};

    public String getPropValues(String propertyName) throws IOException{
        String result = "";

        try{
            Properties prop = new Properties();
            String propFileName = "config.properties";

            inputStream = getClass().getClassLoader().getResourceAsStream(propFileName);

            if(inputStream != null){
                prop.load(inputStream);
            }else{
                throw new FileNotFoundException("Property File '" + propFileName + "' not found in the classpath");
            }

            result = prop.getProperty(propertyName);

        }catch(Exception e){
            e.printStackTrace();
        }finally {
            inputStream.close();
        }
        return result;
    }
}
