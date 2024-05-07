package hu.the.dzae6i;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class DomWriteDZAE6I {
    
    public DomWriteDZAE6I() {
        try {
            File xml_file = new File("C:\\VZGit\\DZAE6IWebkonyv\\DZAE6I_0430\\DomParseDZAE6I\\src\\main\\java\\hu\\the\\dzae6i\\DZAE6I_orarend.xml");
            DocumentBuilderFactory document_builder_factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder document_builder = document_builder_factory.newDocumentBuilder();
            org.w3c.dom.Document xml_document = document_builder.parse(xml_file);
            xml_document.getDocumentElement().normalize();
            
            // New XML document
            Document new_document = document_builder.newDocument();
            
            System.out.println("Root node: " + xml_document.getDocumentElement().getNodeName());
            //https://mkyong.com/java/how-to-create-xml-file-in-java-dom/
            Element new_root_element = new_document.createElement(
                xml_document.getDocumentElement().getNodeName()
            );
            new_document.appendChild(new_root_element);
            
            NodeList node_list = xml_document.getElementsByTagName("event");
            System.out.println("Found nodes: " + node_list.getLength());
            
            for (int i = 0; i < node_list.getLength(); i++) {
                Node node = node_list.item(i);
                
                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    Element element = (Element) node;
                    
                    //https://attacomsian.com/blog/java-read-write-xml
                    Attr new_attribute = new_document.createAttribute("id");
                    new_attribute.setValue(element.getAttribute("id"));
                    Element new_element = new_document.createElement("event");
                    new_element.setAttributeNode(new_attribute);
                    new_root_element.appendChild(new_element);
                    
                    System.out.println("ID: " + element.getAttribute("id"));
                    System.out.println("Course name: " + element.getElementsByTagName("course_name").item(0).getTextContent());
                    System.out.println("Presenter: " + element.getElementsByTagName("presenter").item(0).getTextContent());
                    System.out.println("Major: " + element.getElementsByTagName("major").item(0).getTextContent());
                    System.out.println("Address: " + element.getElementsByTagName("address").item(0).getTextContent());
                    
                    System.out.println("DateTime: " + element.getElementsByTagName("datetime").item(0).getTextContent());
                    
                    //element.get //TODO: Find the datetime of the event and print it
                    /*Element element_datetime = node.getElementsByTagName("datetime");
                    System.out.println("DateTime date: " + element_datetime.getElementsByTagName("date").item(0).getTextContent());*/
                    //NodeList datetime_node_list = node.getChildNodes();
                    //https://stackoverflow.com/questions/8328002/java-reading-xml-with-many-nested-elements
                    NodeList datetime_node_list = element.getElementsByTagName("datetime");
                    for (int j = 0; j < datetime_node_list.getLength(); j++) {
                        //Node datetime_node = datetime_node_list.item(j);
                        Element datetime_element = (Element) datetime_node_list.item(j);
                        
                        System.out.println("DateTime date: " + datetime_element.getElementsByTagName("date").item(0).getTextContent());
                        System.out.println("DateTime time_start: " + datetime_element.getElementsByTagName("time_start").item(0).getTextContent());
                        System.out.println("DateTime time_end: " + datetime_element.getElementsByTagName("time_end").item(0).getTextContent());
                    }
                    
                    System.out.println("");
                }
            }
            
            //https://mkyong.com/java/how-to-create-xml-file-in-java-dom/
            FileOutputStream xml_output = new FileOutputStream(
                "C:\\VZGit\\DZAE6IWebkonyv\\DZAE6I_0430\\DomParseDZAE6I\\src\\main\\java\\hu\\the\\dzae6i\\orarend1_DZAE6I.xml"
            );
            writeXml(
                new_document, 
                xml_output
            );
        }
        catch (Exception exception) {
            exception.printStackTrace();
        }
    }
    
    //https://mkyong.com/java/how-to-create-xml-file-in-java-dom/
    // write doc to output stream
    private static void writeXml(Document doc, OutputStream output) throws TransformerException {

        TransformerFactory transformerFactory = TransformerFactory.newInstance();
        Transformer transformer = transformerFactory.newTransformer();
        DOMSource source = new DOMSource(doc);
        StreamResult result = new StreamResult(output);

        transformer.transform(source, result);

    }
    
}
