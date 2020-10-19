package DAO;

import Entity.Transaction;
import Utils.PropertyGetter;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.ArrayList;

public class TransactionDAO {

     private ArrayList<Transaction> txnList = new ArrayList<Transaction>();
     private Connection con = null;
     private PropertyGetter pg = new PropertyGetter();

     public TransactionDAO (){}

     public Boolean isSubTxn (String category, String description){
          Boolean result = false;

          if(category.trim().toLowerCase().contains("subscription") || category.trim().toLowerCase().contains("subscribe")
                  || description.trim().toLowerCase().contains("subscription")
                  ||description.trim().toLowerCase().contains("subscribe") ){
               result = true;

          }

          return result;
     }

     public void insertTxn (String txnID, String txnDate, String acctID, String category, float txnAmount, String merchantName, String description, String act_ind){
          try {
               String sql = "INSERT INTO TABLE () VALUES (?,?,?,?,?,?,?,?);";
               PreparedStatement stmt = con.prepareStatement(sql);
               stmt.setString(1, txnID);
               stmt.setString(2, txnDate);
               stmt.setString(3, acctID);
               stmt.setString(4, category);
               stmt.setBigDecimal(5, BigDecimal.valueOf(txnAmount));
               stmt.setString(6, merchantName);
               stmt.setString(7, description);
               stmt.setString(8, act_ind);

          }catch (Exception e){
               e.printStackTrace();
          }
     }

     public Connection getCon(){
          try {
               con = DriverManager.getConnection(pg.getPropValues("url"), pg.getPropValues("user"), pg.getPropValues("password"));
          }catch (Exception e){
               e.printStackTrace();
          }

          return con;
     }

     public void addToList(Transaction txn){
          txnList.add(txn);
     }
}
