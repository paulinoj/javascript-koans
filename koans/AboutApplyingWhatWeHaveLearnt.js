var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */

      productsICanEat = _(products).filter(function(item) {return !item.containsNuts && !_(item.ingredients).any(
        function(ingredient) {
          return ingredient == "mushrooms";
        })});

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    // var sum = FILL_ME_IN;    /* try chaining range() and reduce() */

    var sum = _(_.range(1, 1000)).chain().reduce(function (memo, num) {
      if ((num % 3 == 0) || (num % 5 == 0)) {
        return memo + num;
      }
      else
      {
        return memo;
      }
    }, 0).value();

    expect(233168).toBe(sum);

  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {

    /* chain() together map(), flatten() and reduce() */

    var ingredientCount = _(products).chain().map(
      function(product) {
        return product.ingredients;
      }).flatten().reduce(
      function(memo, ingredient) {
        memo[ingredient] = (memo[ingredient] || 0) + 1;
        return memo;
      }, { "{ingredient name}": 0 }).value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
    function largestPrimeFactor(number) {

      var testFactor = 2;
      while (number >= testFactor) {
        while (number % testFactor == 0) {
          number = number / testFactor;
        }
        testFactor++;
      }
      return testFactor - 1;
    }
    expect(largestPrimeFactor(3*7*47)).toBe(47);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

    function isPalindrome(number) {
      var numberString = number.toString();
      return numberString == numberString.split("").reverse("").join("");
    }

    var largestPalindrome = 0;

    for (var i = 100; i <= 999; i++) {
      for (var j = 100; j <= i; j++) {
        var testNumber = i * j;
        if (testNumber > largestPalindrome && isPalindrome(testNumber)) {
          largestPalindrome = testNumber;
        }
      }
    }

    if (largestPalindrome == 0) {
      largestPalindrome = null;
    }

    expect(largestPalindrome).toBe(906609);
  });


  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    var testRange = _.range(20, 1, -1);
    var testNumber = 20;

    while (_(testRange).any(
      function(factor) {
        return testNumber % factor != 0;
      }
    )) 
    {
      testNumber = testNumber + 20;
    }
    expect(testNumber).toBe(232792560);         
  });


  it("should find the difference between the sum of the squares and the square of the sums", function () {
 
    var range = [1, 2, 3];

    var sumOfSquares = _(range).chain().map(
      function(number) {
        return Math.pow(number, 2);
      }).reduce(
      function(memo, number) {
        memo = memo+number;
        return memo;
      }).value();

    var squareOfSums = Math.pow(_(range).reduce(
      function(memo, number) {
        memo = memo+number;
        return memo;
      }), 2);

    var difference = sumOfSquares - squareOfSums;

    expect(difference).toBe(14 - 36);
  });



  it("should find the 10001st prime", function () {
    var primeList = [2, 3];
    var testNumber = 5;
    while (primeList.length < 10001) {
      if (!_(primeList).any(
        function(testFactor) {
          return testNumber % testFactor == 0;
        }))
        primeList.push(testNumber);
      testNumber += 2;
    }
    expect(primeList[10000]).toBe(104743);
  });

});
