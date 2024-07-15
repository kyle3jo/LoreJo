<?php
	class Product{
		public $id;
		public $title;
		public $volume;
		public $revision;
		public $franchise;
		public $rating;
		public $year;
		public $price;
		public $salePrice;
		public $image;
		
		function __construct($id,$title,$volume,$revision,$franchise,$rating,$year,$price,$salePrice,$image){
			$this->id=$id;
			$this->title=$title;
			$this->volume=$volume;
			$this->revision=$revision;
			$this->franchise=$franchise;
			$this->rating=$rating;
			$this->year=$year;
			$this->price=$price;
			$this->salePrice=$salePrice;
			$this->image=$image;
		}
	}
?>