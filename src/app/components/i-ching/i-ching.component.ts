import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

interface KuaInfo {
  name: string;
  subtile: string;
  image: string;
  alt: string;
  kua: string;
  sequence: string;
  wilhelm: string;
  eranos: string;
};

@Component({
  selector: 'i-ching',
  templateUrl: './i-ching.component.html',
  styleUrls: ['./i-ching.component.scss']
})
export class IChingComponent implements OnInit {
  kuaIndex: number = 0;
  inputNumber?: number = undefined;
  param?: string;
  name?: string;
  subtitle?: string;
  image?: string;
  alt?: string;
  kua?: string;
  sequence?: string;
  wilhelm?: string;
  eranos?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.param = params['number'];
        if (this.param) {
          this.inputNumber = parseInt(this.param!) - 1;
        }
      });

    const index = localStorage.getItem('kuaIndex');
    if (index) {
      const storage = parseInt(index!);
      if (this.inputNumber == undefined || this.inputNumber == storage) {
        this.kuaIndex = storage;
      } else {
        this.kuaIndex = this.inputNumber;
      }
    } else if (this.inputNumber != undefined) {
      this.kuaIndex = this.inputNumber;
    }
    this.loadKua(this.kuaIndex);    
  }

  goPrev() {
    if (this.kuaIndex > 0) {
      this.kuaIndex--;
    } else {
      this.kuaIndex = I_CHING.length - 1;
    }
    this.loadKua(this.kuaIndex);
  }

  goNext() {
    if (this.kuaIndex < I_CHING.length - 1) {
      this.kuaIndex++;
    } else {
      this.kuaIndex = 0;
    }
    this.loadKua(this.kuaIndex);
  }

  bookmark() {
    localStorage.setItem('kuaIndex', this.kuaIndex.toString());  
  }

  loadKua(index: number): void {
    this.name = I_CHING[index].name;
    this.subtitle = I_CHING[index].subtile;
    this.image = I_CHING[index].image;
    this.alt = I_CHING[index].alt;
    this.kua = I_CHING[index].kua;
    this.sequence = I_CHING[index].sequence;
    this.wilhelm = I_CHING[index].wilhelm;
    this.eranos = I_CHING[index].eranos;
    this.navigateToNumber();
  }

  navigateToNumber() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        number: `${this.kuaIndex+1}`
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
  }
}

const I_CHING: KuaInfo[] = [
  {
    name: `Energy - The Creative`,
    subtile: `qian`,
    image: `01.jpg`,
    alt: `heaven`,
    sequence: ``,
    kua: `heaven moves ceaselessly.\na junzi uses the creative strength without interruption.`,
    wilhelm: `Since there is only one heaven, the doubling of the trigram Ch'ien, of which heaven is the image, indicates the movement of heaven. One complete revolution of heaven makes a day, and the repetition of the trigram means that each day is followed by another. This creates the idea of time. Since it is the same heaven moving with untiring power, there is also created the idea of duration both in and beyond time, a movement that never stops nor slackens, just as one day follows another in an unending course. This duration in time is the image of power inherent in the Creative.
    \nWith this image as a model, the sage learns how best to develop himself so that his influence may endure. He must make himself strong in every way, by consciously casting out all that is inferior and degrading. Thus he attains that tirelessness which depends upon consciously limiting the fields of his activity.`,
    eranos: `The situation described by this hexagram is characterized by the dominance of Yang, the active quality of being which is the base of all creation and destruction, unceasingly driving forward and ever renewing itself. In excess, this force may burn its own creations before they take concrete form. The hexagram Energy is the doubling of the corresponding trigram, and partakes of its attributes.`
  },
  {
    name: `Space - The Receptive`,
    subtile: `kun`,
    image: `02.jpg`,
    alt: `earth`,
    kua: `earth's potency is the receptive.\na junzi uses generosity and devotion\nto support all beings.`,
    sequence: ``,
    wilhelm: `Just as there is only one heaven, so too there is only one earth. In the hexagram of heaven the doubling of the trigram implies duration in time, but in the hexagram of earth the doubling connotes the solidity and extension in space by virtue of which the earth is able to carry and preserve all things that live and move upon it. The earth in its devotion carries all things, good and evil, without exception. In the same way the superior man gives to his character breadth, purity and sustaining power, so that he is able both to support and to bear with people and things.`,
    eranos: `The situation described by this hexagram is characterized by the dominance of Yin, the receptive and formative quality of being that allows all things to become what they are, available and nurturing like the surface of the earth supporting all creatures. In excess, this receptivity may become dull, inert mobility. The hexagram Space is the doubling of the corresponding trigram, and partakes of its attributes.`
  },
  {
    name: `Difficulty`,
    subtile: `zhun`,
    image: `03.jpg`,
    alt: `water above thunder`,
    kua: `clouds and thunder. difficulty.\na junzi uses principles of coordination.`,
    sequence: `After heaven and earth have come into existence, individual beings develop. It is these individual beings that fill the space between heaven and earth. Hence there follows the hexagram of Difficulty at the Beginning. Difficulty at the beginning is the same as filling up.`,
    wilhelm: `Clouds and thunder are represented by definite decorative lines; this means that in the chaos of difficulty at the beginning, order is already implicit. So too the superior man has to arrange and organize the inchoate profusion of such times of beginning, just as one sorts out silk threads from a knotted tangle and binds them into skeins. In order to find one's place in the infinity of being, one must be able both to separate and to unite`,
    eranos: `The situation described by this hexagram is characterized by difficulties surrounding a new beginning, like the growth of a tender shoot piercing through hard soil.`
  },
  {
    name: `Immaturity`,
    subtile: `meng`,
    image: `04.jpg`,
    alt: `mountain above water`,
    kua: `below the mountain emerges stream-water. immaturity.\na junzi uses productive action to nurture devotion.`,
    sequence: `When, after difficulties at the beginning, things have just been born, they are always wrapped at birth in obtuseness. Hence there follows the hexagram of Youthful Folly. For youthfull folly means youthful obtuseness. This is the state of things in their youth.`,
    wilhelm: `A spring succeeds in flowing on and escapes stagnation by filling up all the hollow places in its path. In the same way character is developed by thoroughness that skips nothing but, like water, gradually and steadily fills all gaps and so flows onward.`,
    eranos: `The situation described by this hexagram is characterized by something covered because still immature, a young, incompletely formed consciousness, which needs to ripen under the protective veil of envelopment.`
  },
  {
    name: `Waiting`,
    subtile: `xu`,
    image: `05.jpg`,
    alt: `water above heaven`,
    kua: `clouds above adjoin heaven. waiting.\na junzi uses drinking, eating, and resting joyfully.`,
    sequence: `When things are still small, one must not leave them without nourishment. Hence there follows the hexagram Hsü. Hsü means the way to eating and drinking.`,
    wilhelm: `When clouds rise in the sky, it is a sign that it will rain. There is nothing to do but to wait until the rain falls. It is the same in life when destiny is at work. We should not worry and seek to shape the future by interfering in things before the time is ripe. We should quietly fortify the body with food and drink and the mind with gladness and good cheer. Fate comes when it will, and thus we are ready.`,
    eranos: `The situation described by this hexagram is characterized by attending both in the sense of waiting for something to manifest and in that of caring for something that needs attention.`
  },
  {
    name: `Contention`,
    subtile: `song`,
    image: `06.jpg`,
    alt: `heaven above water`,
    kua: `heaven accompanies water in contrary motion. contention.\na junzi uses taking action after planning first.`,
    sequence: `Over meat and drink, there is certain to be conflict. Hence there follows the hexagram of Conflict`,
    wilhelm: `The image indicates that the causes of conflict are latent in the opposing tendencies of the two trigrams. Once these opposing tendencies appear, conflict is inevitable. To avoid it, therefore, everything must be taken carefully into consideration in the very beginning. If rights and duties are exactly defined, or if, in a group, the spiritual trends of the individuals harmonize, the cause of conflict is removed in advance.`,
    eranos: `The situation described by this hexagram is characterized by being involved in a dispute requiring a bold statement of one's arguments.`
  },
  {
    name: `The Army`,
    subtile: `shi`,
    image: `07.jpg`,
    alt: `earth above water`,
    kua: `earth's center possesses water. the army.\na junzi uses embracing the populace to accumulate crowds.`,
    sequence: `When there is conflict, the masses are sure to rise up. Hence there follows the hexagram of The Army. Army means mass.`,
    wilhelm: `Ground water is invisibly present within the earth. In the same way the military power of a people is invisibly present in the masses. When danger threatens, every peasant becomes a soldier; when the war ends, he goes back to his plow. He who is generous toward the people wins their love, and a people living under a mild rule becomes strong and powerful. Only a people economically strong can be important in military power. Such power must therefore be cultivated by improving the economic condition of the people and by humane government. Only when there is this invisible bond between government and people, so that the people are sheltered by their government as groundwater is sheltered by the earth, is it possible to wage a victorious war.`,
    eranos: `The situation described by this hexagram is characterized by the organization of scattered elements into functional units around a worthy aggregating center, like an army around its commander.`
  },
  {
    name: `Closeness`,
    subtile: `bi`,
    image: `08.jpg`,
    alt: `water above earth`,
    kua: `earth possesses water above. closeness.\nancient kings used establishing myriad cities and closely associating with their administrators.`,
    sequence: `Among the masses there is surely a reason for uniting. Hence there follows the hexagram of Holding Together. Holding together means uniting.`,
    wilhelm: `Water fills up all the empty places on the earth and clings fast to it. The social organization of ancient China was based on this principle of the holding together of dependents and rulers. Water flows to unite with water, because all parts of it are subject to the same laws. So too should human society hold together through a community of interests that allows each individual to feel himself a member of a whole. The central power of a social organization must see too it that every member finds that his true interest lies in holding together with it, as was the case in the paternal relationship between king and vassals in ancient China.`,
    eranos: `The situation described by this hexagram is characterized by sorting and comparing things or people according to their essential nature and grouping what belongs together.`
  },
  {
    name: `Small Development`,
    subtile: `xiao chu`,
    image: `09.jpg`,
    alt: `wind above heaven`,
    kua: `the wind moves above heaven. small development.\na junzi uses exemplary archetypal devotion.`,
    sequence: `Through holding together, restraint is certain to come about. Hence there follows The Taming Power of the Small`,
    wilhelm: `The wind can indeed drive the clouds together in the sky; yet, being nothing but air, without solid body, it does not produce great or lasting effects. So also an individual, in times when he can produce no great effect in the outer world, can do nothing except refine the expression of his nature in small ways.`,
    eranos: `The situation described by this hexagram is characterized by the accumulation of a multiplicity of seemingly unrelated events and circumstances, which require a flexible adaptation.`
  },
  {
    name: `Treading`,
    subtile: `lü`,
    image: `10.jpg`,
    alt: `heaven above lake`,
    kua: `heaven above the lake below. treading.\na junzi discriminates between above and belowand so settles the populace's ambitions`,
    sequence: `When beings are subjected to restraint the mores arise; hence there follows the hexagram of Conduct`,
    wilhelm: `Heaven and the lake show a difference of elevation that inheres in the natures of the two, hence no envy arises. Among mankind also there are necessarily differences of elevation; it is impossible to bring about universal equality. But it is important that differences is social rank should not be arbitrary and unjust, for if this occurs, envy and class struggle are the inevitable consequences. If, on the other hand, external differences in rank correspond with differences in inner worth, and if inner worth forms the criterion of external rank, people acquiesce and order reigns in society.`,
    eranos: `The situation described by this hexagram is characterized by making one's own path by treading on dangerous ground, requiring heightened awareness.`
  },
  {
    name: `Tranquility`,
    subtile: `tai`,
    image: `11.jpg`,
    alt: `earth above heaven`,
    kua: `heaven and earth mingle. tranquility.\na ruler uses wealth to administer the Way of heaven and earth. thus he assists the reciprocity characteristic of heaven and earth, and so uses both the left-hand and right-hand of the populace.`,
    sequence: `Good conduct, then contentment; thus calm peace prevails. Hence there follows the hexagram of Peace. Peace means union, interrealtion.`,
    wilhelm: `Heaven and earth are in contact and combine their influences, producing a time of universal flowering and prosperity. This stream of energy must be regulated by the ruler of men. It is done by a process of division. Thus men divide the uniform flow of time into the seasons, according to the succession of natural phenomena, and mark off infinite space by the points of the compass. In this way nature in its overwhelming profusion of phenomena is bounded and controlled. On the other hand, nature must be furthered in her productiveness. This is done by adjusting the products to the right time and the right place, which increases the natural yield. This controlling and furthering activity of man in his relation to nature is the work on nature that rewards him.`,
    eranos: `The situation described by this hexagram is characterized by an auspicious conjunction of heaven and earth bringing expansion, harmony and peace.`
  },
  {
    name: `Obstruction`,
    subtile: `pi`,
    image: `12.jpg`,
    alt: `heaven above earth`,
    kua: `heaven and earth do not mingle. obstruction.\na junzi uses moderation and devotion to withstand peril. he does not gratify indulgence when using revenues.`,
    sequence: `Things cannot remain forever united; hence there follows the hexagram of Standstill.`,
    wilhelm: `When, owing to the influence of inferior men, mutual mistrust prevails in public life, fruitful activity is rendered impossible, because the fundaments are wrong. Therefore the superior man knows what he must do under such circumstances; he does not allow himself to be tempted by dazzling offers to take part in public activities. This would only expose him to danger, since he cannot assent to the meanness of the others. He therefore hides his worth and withdraws into seclusion.`,
    eranos: `The situation described by this hexagram is characterized by a disjunction of heaven and earth temporarily interrupting the flow of life and thwarting communication and development.`
  },
  {
    name: `Association with Others`,
    subtile: `tong ren`,
    image: `13.jpg`,
    alt: `heaven above fire`,
    kua: `heaven accompanies fire. association with others.\na junzi uses categorizing clans and distinguishing beings.`,
    sequence: `Things cannot be at a standstill forever. Hence there follows the hexagram of Fellowship with Men`,
    wilhelm: `Heaven has the same direction of movement as fire, yet it is different from fire. Just as the luminaries in the sky serve for the systematic division and arrangement of time, so human society and all things that really belong together must be organically arranged. Fellowship should not be a mere mingling of individuals or of things—that would be chaos, not fellowship. If fellowship is to lead to order, there must be organization within diversity.`,
    eranos: `The situation described by this hexagram is characterized by cooperation, people united by a common goal.`
  },
  {
    name: `Great Possession`,
    subtile: `da you`,
    image: `14.jpg`,
    alt: `fire above heaven`,
    kua: `fire located above heaven. great possession.\na junzi uses stopping evil and promoting good. by obeying heaven he eases into his destiny.`,
    sequence: `Through Fellowship with Men things are sure to fall to one's lot. Hence there follows the hexagram of Possession in Great Measure.`,
    wilhelm: `The sun in heaven above, shedding light over everything on the earth, is the image of possession on a grand scale. But a possession of this sort must be administered properly. The sun brings both evil and good into the light of day. Man must combat and curb the evil, and must favor and promote the good. Only in this way does he fulfill the benevolent will of god, who desires only good and not evil.`,
    eranos: `The situation described by this hexagram is characterized by a central idea or long-term goal, which acts as an organizing force directing the course of one’s life.`
  },
  {
    name: `Humility`,
    subtile: `qian`,
    image: `15.jpg`,
    alt: `earth above mountain`,
    kua: `earth's center possesses a mountain. humility.\na junzi decreases excess and augments deficiencies. he assesses beings and encourages impartial distribution.`,
    sequence: `He who possesses something great must not make it too full; hence there follows the hexagram of Modesty.`,
    wilhelm: `The wealth of the earth in which a mountain is hidden is not visible to the eye, because the depths are offset by the height of the mountain. Thus high and low complement each other, and the result is the plain. Here an effect that it took a long time to achieve, but that in the end seems easy of accomplishment and self-evident, is used as the image of modesty. The superior man does the same thing when he establishes order in the world; he equalizes the extremes that are the source of social discontent and thereby creates just and equable conditions.`,
    eranos: `The situation described by this hexagram is characterized by cutting through pride and arrogance, keeping one's words adherent  to one's basic reality.`
  },
  {
    name: `Delight`,
    subtile: `yu`,
    image: `16.jpg`,
    alt: `thunder above earth`,
    kua: `thunder emerges from earth impetuously. delight.\nancient kings used rousing music to inspire devotion, a devout reverence of supreme power using a oneness ancestral and archaic.`,
    sequence: `When one possesses something great and is modest, there is sure to be enthusiasm. Hence there follows the hexagram of Enthusiasm.`,
    wilhelm: `When, at the beginning of summer, thunder—electrical energy—comes rushing forth from the earth again, and the first thunderstorm refreshes nature, a prolonged state of tension is resolved. Joy and relief make themselves felt. So too, music has the power to ease tension from the heart and to loosen the grip of obscure emotions. The enthusiasm of the heart expresses itself involuntarily in a burst of song, in dance and rhythmic movement of the body. From immemorial times the inspiring effect of the invisible sound that moves all hearts, and draws them together, has mystified mankind.
    Rulers have made use of this natural taste for music; they elevated and regulated it. Music was looked upon as something serious and holy, designed to purify the feelings of men. It fell to music to glorify the virtues of heroes and thus to construct a bridge to the world of the unseen. In the temple men drew near to god with music and pantomimes (out of this later the theater developed.) Religious feeling for the creator of the world was united with the most sacred of human feelings, that of reverence for the ancestors. The ancestors were invited to these divine services as guests of the ruler of heaven and as representatives of humanity in the higher regions. This uniting of the human past with the divinity in solemn moments of religious inspiration established the bond between god and man. The ruler who revered the divinity in revering his ancestors became thereby the son of heaven, in whom the heavenly and the earthly world met in mystical contact.
    These ideas are the final summation of Chinese culture. Confucius has said of the great sacrifice at which these rites were performed: “He who could wholly comprehend this sacrifice could rule the world as though it were spinning on his hand.”`,
    eranos: `The situation described by this hexagram is characterized by providing for oneself and others, preparing for future ease and contentment.`
  },
  {
    name: `Following`,
    subtile: `sui`,
    image: `17.jpg`,
    alt: `lake above thunder`,
    kua: `the lake's center possesses thunder. following.\na junzi uses the approach of darkness to enter into a restful pause.`,
    sequence: `Where there is enthusiasm, there is certain to be following. Hence there follows the hexagram of Following.`,
    wilhelm: `In the autumn electricity withdraws into the earth again and rests. Here it is the thunder in the middle of the lake that serves as the image—thunder in its winter rest, not thunder in motion. The idea of following in the sense of adaptation to the demands of the time grows out of this image. Thunder in the middle of the lake indicates times of darkness and rest. Similarly, a superior man, after being tirelessly active all day, allows himself rest and recuperation at night. No situation can become favorable until one is able to adapt to it and does not wear himself out with mistaken resistance.`,
    eranos: `The situation described by this hexagram is characterized by following a person or an example, accepting guidance, taking one's place in a sequence or tradition.`
  },
  {
    name: `Degeneration`,
    subtile: `gu`,
    image: `18.jpg`,
    alt: `mountain above wind`,
    kua: `the mountain possesses wind below. degeneration.\na junzi uses inspiring the populace and then strengthening their devotion.`,
    sequence: `When one follows others with pleasure, There are certain to be undertakings. Hence there follows the hexagram of Work on What Has Been Spoiled. Work on what has been spoiled means undertakings.`,
    wilhelm: `When the wind blows low on the mountain, it is thrown back and spoils the vegetation. This contains a challenge to improvement. It is the same with debasing attitudes and fashions; they corrupt human society. To do away with this corruption, the superior man must regenerate society. His methods likewise must be derived from the two trigrams, but in such a way that their effects unfold in orderly sequence. The superior man must first remove stagnation by stirring up public opinion, as the wind stirs everything, and must then strengthen and tranquillize the character of the people, as the mountain gives tranquility and nourishment to all that grows in its vicinity.`,
    eranos: `The situation described by this hexagram is characterized by the rotting away of something that has become poisonous, a putrefaction that has to run its course in order for a new birth to be possible.`
  },
  {
    name: `Overseeing`,
    subtile: `lin`,
    image: `19.jpg`,
    alt: `earth above lake`,
    kua: `the lake possesses earth above. overseeing.\na junzi uses education and insight without exhaustion, and embraces protecting the populace without limit.`,
    sequence: `When there are things to do, one can become great. Hence there follows the hexagram of Approach. Approach means becomming greeat.`,
    wilhelm: `The earth borders upon the lake from above. This symbolizes the approach and condescension of the man of higher position to those beneath him. The two parts of the image indicate what his attitude toward these people will be. Just as the lake is inexhaustible in depth, so the sage is inexhaustible in his readiness to teach mankind, and just as the earth is boundlessly wide, sustaining and caring for all creatures on it, so the sage sustains and cares for all people and excludes no part of humanity.`,
    eranos: `The situation described by this hexagram is characterized by the approach of something higher or greater. This process cannot be rushed, and the gestation must be allowed to run its full course.`
  },
  {
    name: `Observing`,
    subtile: `guan`,
    image: `20.jpg`,
    alt: `wind above earth`,
    kua: `wind moves above the earth. observing.\nancient kings used inspecting their regions and observing the populace to enact instruction.`,
    sequence: `When things are great, one can contemplate them. Hence there follows the hexagram of Contemplation.`,
    wilhelm: `When the wind blows over the earth it goes far and wide, and the grass must bend to its power. These two occurrences find confirmation in the hexagram. The two images are used to symbolize a practice of the kings of old; in making regular journeys the ruler could, in the first place, survey his realm and make certain that none of the existing usages of the people escaped notice; in the second, he could exert influence through which such customs as were unsuitable could be changed. All of this points to the power possessed by a superior personality. On the one hand, such a man will have a view of the real sentiments of the great mass of humanity and therefore cannot be deceived; on the other, he will impress the people so profoundly, by his mere existence and by the impact of his personality, that they will be swayed by him as the grass by the wind.`,
    eranos: `The situation described by this hexagram is characterized by contemplating something from a distance, without immediate involvement.`
  },
  {
    name: `Biting Through`,
    subtile: `shi he`,
    image: `21.jpg`,
    alt: `fire above thunder`,
    kua: `thunder and lightning. biting through.\nancient kings used clarifying penalties and executing judgements.`,
    sequence: `When there is something that can be contemplated, there is something that creates union. Hence there follows the hexagram of Biting Through. Biting through means union.`,
    wilhelm: `Penalties are the individual applications of the law. The laws specify the penalties. Clarity prevails when mild and severe penalties are clearly differentiated, according to the nature of the crimes. This is symbolized by the clarity of lightning. The law is strengthened by a just application of penalties. This is symbolized by the terror of thunder. This clarity and severity have the effect of instilling respect; it is not that the penalties are ends in themselves. The obstructions in the social life of man increase when there is lack of clarity in the penal codes and slackness in executing them. The only way to strengthen the law is to make it clear and to make penalties certain and swift.`,
    eranos: `The situation described by this hexagram is characterized by acting decisively in order to overcome a tenacious obstacle, energetically biting through something one has been gnawing for some time.`
  },
  {
    name: `Adornment`,
    subtile: `bi`,
    image: `22.jpg`,
    alt: `mountain above fire`,
    kua: `the mountain possesses fire below. adornment.\na junzi uses clarifying social ethics and avoiding premature judgement about litigations.`,
    sequence: `Things should not unite abrubtly and ruthlessly; hence there follows the hexagram of Grace. Grace is the same as adorment.`,
    wilhelm: `The fire, whose light illuminates the mountain and makes it pleasing, does not shine far; in the same way, beautiful form suffices to brighten and to throw light upon matters of lesser moment, but important questions cannot be decided in this way. This requires greater earnestness.`,
    eranos: `The situation described by this hexagram is characterized by caring for the beauty of outer presentation, enhancing intrinsic value by esthetic sensitivity to details.`
  },
];

/*
  {
    name: ``,
    subtile: ``,
    image: `00.jpg`,
    alt: ``,
    kua: ``,
    sequence: ``,
    wilhelm: ``,
    eranos: ``
  },
*/