package CSVReader;

import DAO.TransactionDAO;
import Entity.Transaction;
import Utils.PropertyGetter;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;

import java.io.FileReader;
import java.util.List;

public class ReadCSV {

    private PropertyGetter pg = new PropertyGetter();
    private TransactionDAO txnDao = new TransactionDAO();

    public ReadCSV(){}

    public void readCSV(){
        try {
            FileReader plaidFilereader = new FileReader(pg.getPropValues("PlaidCsvFilePath"));

            CSVReader plaidCsvReader = new CSVReaderBuilder(plaidFilereader)
                    .withSkipLines(1)
                    .build();

            List<String[]> plaidAllData = plaidCsvReader.readAll();

            for(String[] row : plaidAllData){
                String txnId = row[0];
                String txnDate = row[1];
                String accountId = row[2];
                String category = row[3];
                float txnAmount = Float.parseFloat(row[4]);
                String merchantName = row[5];
                String description = row[6];
                String activeId = "N";
                if(txnDao.isSubTxn(category, description)){
                    Transaction subTxn = new Transaction(txnId, txnDate, accountId, category, txnAmount, merchantName, description, activeId);
                    txnDao.addToList(subTxn);
               //     txnDao.insertTxn(txnId, txnDate, accountId, category, txnAmount, merchantName, description, activeId);

                    //debugging
                    subTxn.toString();
                    System.out.println();
                }else{
                    System.out.println("Not a subscription");
                }
            }

        }catch (Exception e) {
            e.printStackTrace();
        }

    }


    String removeLeading(String s) {
        StringBuilder sb = new StringBuilder(s);
        while (sb.length() > 0 && (sb.charAt(0) == '"' || sb.charAt(0) == '[' )) {
            sb.deleteCharAt(0);
        }
        return sb.toString();
    }

    String removeTrailing(String s) {
        StringBuilder sb = new StringBuilder(s);
        while (sb.length() > 0 && (sb.charAt(0) == '"' || sb.charAt(0) == ']' )) {
            sb.setLength(sb.length() - 1);
        }
        return sb.toString();
    }


}
