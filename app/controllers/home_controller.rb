class HomeController < ApplicationController

  require "base64"

  MOVE_DOWN = 30

  def index
  end
  
  ##handle pdf, xls document signature 
  def sign_document
    
    ##if requested document type is 'pdf'
    if params[:doc_type] == "pdf"

      pdf = get_pdf

      pdf.move_down MOVE_DOWN

      pdf.text "<b><u>E-Sign Rails</u></b>", align: :center, inline_format: true

      pdf.move_down MOVE_DOWN
      
      ##call method and generate signature from data uri 
      signature = encode_signature_uri(params[:data_uri])
       
      pdf.image signature,:at => [0, pdf.y], width: 100, height: 50
      pdf.move_down 20
      pdf.text_box "Signed By User", size: 10, style: :bold, at: [0, (pdf.y - MOVE_DOWN)]
      
      ##send signed pdf to browser
      return send_data pdf.render, type: :pdf, filename: "e-Sign-rails.pdf"
   

    ##if requested document type is 'xls'
    elsif params[:doc_type] == "xls"
    
      package = get_xls
      wb = package.workbook 
      wb.add_worksheet(name: "e-Sign-rails") do |sheet|
        
        ##add two blank rows
        sheet.add_row
        bold_style = wb.styles.add_style(b: true, sz: 14)
        sheet.add_row [nil, nil, nil, "E-Sign Rails"], style: bold_style
        
        ##create signature from binary data
        image = Rails.root.join('tmp', "sign.png");
        File.open(image, 'wb') do |f|
          f.write Base64.decode64(params[:data_uri].split(",")[1])
        end
        
        sheet.add_row
        sheet.add_row
        signature = File.expand_path(image, __FILE__)

        sheet.add_image(image_src: signature, noSelect: true, noMove: true) do |i|
          i.width = 150
          i.height = 50
          i.start_at 0, sheet.rows.length
        end

        sheet.add_row
        sheet.add_row
        sheet.add_row
        sheet.add_row ["Signed By User"], style: bold_style

      end

      return send_data package.to_stream.read, type: "application/xlsx", filename: "e-Sign-rails.xlsx"
     
      ###add two blank rows
    end

  end




  private
    
    ##initialize pdf object
    def get_pdf
      Prawn::Document.new(page_layout: :portrait, page_size: 'A4', top_margin: 10, left_margin: 50)
    end

    ##initialize xls object
    def get_xls
      package = Axlsx::Package.new
    end

    ##encode data uri
    def encode_signature_uri(uri)
      encode_uri = uri.split(",")[1]

      img = Tempfile.new('sign.png', encoding: 'utf-8')
       File.open(img, 'wb') do |f|
        f.write Base64.decode64(encode_uri)
      end

      return img

    end

  
end