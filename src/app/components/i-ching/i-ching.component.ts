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
    kua: `clouds and thunder. difficulty.\na junzi uses principles of organization.`,
    sequence: `After heaven and earth have come into existence, individual beings develop. It is these individual beings that fill the space between heaven and earth. Hence there follows the hexagram of Difficulty at the Beginning. Difficulty at the beginning is the same as filling up.`,
    wilhelm: `Clouds and thunder are represented by definite decorative lines; this means that in the chaos of difficulty at the beginning, order is already implicit. So too the superior man has to arrange and organize the inchoate profusion of such times of beginning, just as one sorts out silk threads from a knotted tangle and binds them into skeins. In order to find one's place in the infinity of being, one must be able both to separate and to unite`,
    eranos: `The situation described by this hexagram is characterized by difficulties surrounding a new beginning, like the growth of a tender shoot piercing through hard soil.`
  },
  {
    name: `Immaturity`,
    subtile: `meng`,
    image: `04.jpg`,
    alt: `mountain above water`,
    kua: `below the mountain emerges springwater. immaturity.\na junzi uses productive action to nurture devotion.`,
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
    kua: `the wind moves above heaven. small development.\na junzi uses impeccable archetypal devotion.`,
    sequence: `Through holding together, restraint is certain to come about. Hence there follows The Taming Power of the Small`,
    wilhelm: `The wind can indeed drive the clouds together in the sky; yet, being nothing but air, without solid body, it does not produce great or lasting effects. So also an individual, in times when he can produce no great effect in the outer world, can do nothing except refine the expression of his nature in small ways.`,
    eranos: `The situation described by this hexagram is characterized by the accumulation of a multiplicity of seemingly unrelated events and circumstances, which require a flexible adaptation.`
  },
  {
    name: `Treading`,
    subtile: `lü`,
    image: `10.jpg`,
    alt: `heaven above lake`,
    kua: `heaven above the lake below. treading.\na junzi discriminates between above and below and so settles the populace's ambitions`,
    sequence: `When beings are subjected to restraint the mores arise; hence there follows the hexagram of Conduct`,
    wilhelm: `Heaven and the lake show a difference of elevation that inheres in the natures of the two, hence no envy arises. Among mankind also there are necessarily differences of elevation; it is impossible to bring about universal equality. But it is important that differences in social rank should not be arbitrary and unjust, for if this occurs, envy and class struggle are the inevitable consequences. If, on the other hand, external differences in rank correspond with differences in inner worth, and if inner worth forms the criterion of external rank, people acquiesce and order reigns in society.`,
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
    kua: `heaven accompanies fire. association with others.\na junzi uses organizing into clans and distinguishing beings.`,
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
    kua: `the mountain possesses wind below. degeneration.\na junzi uses inspiring the populace and strengthening their devotion.`,
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
    kua: `wind moves above the earth. observing.\nancient kings used inspecting their regions and observing the populace to setup education.`,
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
  {
    name: `Stripping-Away`,
    subtile: `bo`,
    image: `23.jpg`,
    alt: `mountain above earth`,
    kua: `the mountain's border adjoins earth. stripping-away.\nthose above use generosity toward those below to secure their position.`,
    sequence: `When one goes too far in adornment, success exhausts itself. Hence there follows the hexagram of splitting Apart. Splitting apart means ruin.`,
    wilhelm: `The mountain rests on the earth. When it is steep and narrow, lacking a broad base, it must topple over. Its position is strong only when it rises out of the earth broad and great, not proud and steep. So likewise those who rule rest on the broad foundation of the people. They too should be generous and benevolent, like the earth that carries all. Then they will make their position as secure as a mountain is in its tranquility.`,
    eranos: `The situation described by this hexagram is characterized by stripping away a worn-out or obsolete form of presentation, cutting away the inessential.`
  },
  {
    name: `Return`,
    subtile: `fu`,
    image: `24.jpg`,
    alt: `earth above thunder`,
    kua: `thunder located in the earth's center. return.\nancient kings used the winter solstice to close passages. merchant caravans did not travel and rulers did not inspect their regions`,
    sequence: `Things cannot be destroyed once and for all. When what is above is completely split apart, it returns below. Hence there follows the hexagram of return.`,
    wilhelm: `The winter solstice has always been celebrated in China as the resting time of the year—a custom that survives in the time of rest observed at the new year. In winter the life energy, symbolized by thunder, the Arousing, is still underground. Movement is just at its beginning; therefore it must be strengthened by rest, so that it will not be dissipated by being used prematurely. This principle, i.e., of allowing energy that is renewing itself to be reinforced by rest, applies to all similar situations. The return of health after illness, the return of understanding after an estrangement: everything must be treated tenderly and with care at the beginning, so that the return may lead to a flowering.`,
    eranos: `The situation described by this hexagram is characterized by the re-emergence of something past, returning to a previous time or place or retracing a path  in order to correct one's mistakes.`
  },
  {
    name: `No Error`,
    subtile: `wu wang`,
    image: `25.jpg`,
    alt: `heaven above thunder`,
    kua: `below heaven thunder moves. all beings aspire toward no error.\nancient kings used expenditure in harmony with the season and so nurtured myriad beings.`,
    sequence: `By turning back one is freed of guilt. Hence there follows the hexagram of Innocence.`,
    wilhelm: `In springtime when thunder, life energy, begins to move again under the heavens, everything sprouts and grows, and all beings receive from the creative activity of nature the childlike innocence of their original state. So it is with the good rulers of mankind: drawing on the spiritual wealth at their command, they take care of all forms of life and all forms of culture and do everything to further them, and at the proper time.`,
    eranos: `The situation described by this hexagram is characterized by maintaining a sincere and correct attitude, keeping aloof from events which might entangle one in error, confusion or recklessness.`
  },
  {
    name: `Great Accumulation`,
    subtile: `da chu`,
    image: `26.jpg`,
    alt: `mountain above heaven`,
    kua: `heaven located in the mountain's center. great accumulation.\na junzi uses many recorded precedents of speech and past actions, and applies them to strengthen his devotion.`,
    sequence: `When innocence is present, it is possible to tame. Hence there follows the Taming Power of the Great.`,
    wilhelm: `Heaven within the mountain points to hidden treasures. In the words and deeds of the past there lies a hidden treasure that men may use to strengthen and elevate their own characters. The way to study the past is not to confine oneself to mere knowledge of history, but through application of this knowledge, to give actuality to the past.`,
    eranos: `The situation described by this hexagram is characterized by a central idea or long-term goal, around which a wealth of experiences accumulate.`
  },
  {
    name: `Nourishment`,
    subtile: `da chu`,
    image: `27.jpg`,
    alt: `mountain above thunder`,
    kua: `the mountain possesses thunder below. nourishment.\na junzi uses considerate words while speaking, and is moderate in eating and drinking.`,
    sequence: `When things are held fast, there is provision of nourishment. Hence there follows the hexagram of the Corners of the Mouth. "The corners of the mouth" means the providing of nourishment.`,
    wilhelm: `“Good comes forth in the sign of the Arousing”: when in the spring the life forces stir again, all things come into being anew. “He brings to perfection in the sign of Keeping Still”: thus in the early spring, when the seeds fall to earth, all things are made ready. This is an image of providing nourishment through movement and tranquility. The superior man takes it as a pattern for the nourishment and cultivation of his character. Words are a movement going from within outward. Eating and drinking are movements from without inward. Both kinds of movement can be modified by tranquility. For tranquility keeps the words that come out of the mouth from exceeding proper measure, and keeps the food that goes into the mouth from exceeding its proper measure. Thus character is cultivated.`,
    eranos: `The situation described by this hexagram is characterized by paying attention to how one seeks nourishment and opening to receive it.`
  },
  {
    name: `Great Surpassing`,
    subtile: `da guo`,
    image: `28.jpg`,
    alt: `lake above wood`,
    kua: `the lake submerges wood. great surpassing.\na junzi uses standing alone, upright without fear, and withdraws from the world without regret.`,
    sequence: `Without provision of nourishment one cannot move; hence there follows the hexagram of Preponderance of the Great.`,
    wilhelm: `Extraordinary times when the great preponderates are like floodtimes when the lake rises over the treetops. But such conditions are temporary. The two trigrams indicate the attitude proper to such exceptional times: the symbol of the trigram Sun is the tree, which stands firm even though it stands alone, and the attribute of Tui is joyousness, which remains undaunted even if it must renounce the world.`,
    eranos: `The situation described by this hexagram is characterized by the excessive predominance of a central idea or goal, which may become too heavy to bear.`
  },
  {
    name: `The Gorge - Water`,
    subtile: `kan`,
    image: `29.jpg`,
    alt: `water`,
    kua: `water doubled flows onward. the gorge.\na junzi uses unchanging devout action, and makes use of repetition for instructing tasks.`,
    sequence: `Things cannot be permanently in an overweighted state. Hence there follows the hexagram of the Abysmal. The Abysmal means a pit.`,
    wilhelm: `Water reaches its goal by flowing continually. It fills up every depression before it flows on. The superior man follows its example; he is concerned that goodness should be an established attribute of character rather than an accidental and isolated occurrence. So likewise in teaching others everything depends on consistency, for it is only through repetition that the pupil makes the material his own.`,
    eranos: `The situation described by this hexagram is characterized by the flow of life being on the brink of a dangerous plunge, which can only be overcome by risking, venturing and falling until a bottom is reached. The hexagram The Gorge is the doubling of the corresponding trigram, and partakes of its attributes.`
  },
  {
    name: `The Radiance - Fire`,
    subtile: `li`,
    image: `30.jpg`,
    alt: `fire`,
    kua: `fire doubled generates radiance.\nthe great person uses continuous brightening so his illumination spreads to the four quarters.`,
    sequence: `In a pit there is certain to be something clinging within. Hence there follows the hexagram of the Clinging. The Clinging means resting on something.`,
    wilhelm: `Each of the two trigrams represents the sun in course of a day. The two together represent the repeated movement of the sun, the function of light with respect to time. The great man continues the work of nature in the human world. Through the clarity of his nature he causes the light to spread farther and farther and to penetrate the nature of every man ever more deeply.`,
    eranos: `The situation described by this hexagram is characterized by a source of light, warmth and awareness, which gathers people around itself. The hexagram The Radiance is the doubling of the corresponding trigram and partakes of its attributes.`
  },
  {
    name: `Sensing`,
    subtile: `xian`,
    image: `31.jpg`,
    alt: `lake above mountain`,
    kua: `the mountain possesses lake above. sensing.\na junzi uses openness receiving others.`,
    sequence: `After there are heaven and earth, there are the individual things. After individual things have come into being, there are the two sexes. After there are male and female, there is the relationship between husband and wife. After the relationship between husband and wife exists, there is the relationship between father and son. After the relationship between father and son exists, there is the relationship between prince and servant. After the relationship between prince and servant exists, there is the difference between superior and inferior. After the releationship between superior and inferior exists, the rules of propriety and right can operate.`,
    wilhelm: `A mountain with a lake on its summit is stimulated by the moisture from the lake. It has this advantage because its summit does not jut out as a peak but is sunken. The image counsels that the mind should be kept humble and free, so that it may remain receptive to good advice. People soon give up counseling a man who thinks he knows everything better than anyone else.`,
    eranos: `The situation described by this hexagram is characterized by the attraction and influence between two complementary parts of a whole.`
  },
  {
    name: `Constancy`,
    subtile: `heng`,
    image: `32.jpg`,
    alt: `thunder above wind`,
    kua: `thunder and wind. constancy.\na junzi uses standing firm without changing his inner direction.`,
    sequence: `The way of husband and wife must not be other than long-lasting. Hence there follows the hexagram of Duration. Duration means long-lasting.`,
    wilhelm: `Thunder rolls, and the wind blows; both are examples of extreme mobility and so are seemingly the very opposite of duration, but the laws governing their appearance and subsidence, their coming and going, endure. In the same way the independence of the superior man is not based on rigidity and immobility of character. He always keeps abreast of the time and changes with it. What endures is the unswerving directive, the inner law of his being, which determines all his actions.`,
    eranos: `The situation described by this hexagram is characterized by duration, long-term commitment, steady determination and persistence.`
  },
  {
    name: `Retreat`,
    subtile: `dun`,
    image: `33.jpg`,
    alt: `heaven above mountain`,
    kua: `heaven possesses the mountain below. retreat.\na junzi uses distancing petty individuals without aversion or intimidation`,
    sequence: `Things cannot abide forever in their place: hence there follows the hexagram of Retreat. Retreat means withdrawing.`,
    wilhelm: `The mountain rises up under heaven, but owing to its nature it finally comes to a stop. Heaven on the other hand retreats upward before it into the distance and remains out of reach. This symbolizes the behavior of the superior man toward a climbing inferior; he retreats into his own thoughts as the inferior man comes forward. He does not hate him, for hatred is a form of subjective involvement by which we are bound to the hated object. The superior man shows strength (heaven) in that he brings the inferior man to a standstill (mountain) by his dignified reserve.`,
    eranos: `The situation described by this hexagram is characterized by withdrawing and seclusion, the end of an active involvement.`
  },
  {
    name: `Great Power`,
    subtile: `da zhuang`,
    image: `34.jpg`,
    alt: `thunder above heaven`,
    kua: `thunder located above heaven. great power.\na junzi uses—when not ethical whatsoever—refraining from action.`,
    sequence: `Things cannot retreat forever, hence there follows the Power of the Great.`,
    wilhelm: `Thunder—electrical energy—mounts upward in the spring. The direction of this movement is in harmony with that of the movement of heaven. It is therefore a movement in accord with heaven, producing great power. However, true greatness depends on being in harmony with what is right. Therefore in times of great power the superior man avoids doing anything that is not in harmony with the established order.`,
    eranos: `The situation described by this hexagram is characterized by the invigorating power of a central idea or long-term goal, which stimulates and spurs to action.`
  },
  {
    name: `Advance`,
    subtile: `jin`,
    image: `35.jpg`,
    alt: `fire above earth`,
    kua: `brightness emerges above the earth. advance.\na junzi uses self enlightenment to brighten his devotion.`,
    sequence: `Beings cannot stay forever in a state of power; hence there follows the hexagram of Progress. Progress means expansion.`,
    wilhelm: `The light of the sun as it rises over the earth is by nature clear. The higher the sun rises, the more it emerges from the dark mists, spreading the pristine purity of its rays over an ever widening area. The real nature of man is likewise originally good, but it becomes clouded by contact with earthly things and therefore needs purification before it can shine forth in its native clarity.`,
    eranos: `The situation described by this hexagram is characterized by thriving and flourishing like a plant in full sunlight.`
  },
  {
    name: `Damage to Illumination`,
    subtile: `ming yi`,
    image: `36.jpg`,
    alt: `earth above fire`,
    kua: `brightness enters the earth's center. damage to illumination.\na junzi uses overseeing the masses by acting unobtrusively while yet brightened.`,
    sequence: `Expansion will certainly encounter resistance and injury. Hence there follows the hexagram of Darkening of the Light. Darkening means damage, injury.`,
    wilhelm: `In a time of darkness it is essential to be cautious and reserved. One should not needlessly awaken overwhelming enmity by inconsiderate behavior. In such times one ought not to fall in with the practices of others; neither should one drag them censoriously into the light. In social intercourse one should not try to be all-knowing. One should let many things pass, without being duped.`,
    eranos: `The hexagram describes a situation in which the light is wounded or forced to hide, and the work of consciousness can only be carried on underground.`
  },
  {
    name: `People in the Home`,
    subtile: `jia ren`,
    image: `37.jpg`,
    alt: `wind above fire`,
    kua: `wind from fire emerges. people in the home.\na junzi uses words possessing substance and deeds possessing tenacity.`,
    sequence: `He who is injured without, of a certainty draws back into his family. Hence there follows the hexagram of the Family.`,
    wilhelm: `Heat creates energy: this is signified by the wind stirred up by the fire and issuing forth from it. This represents influence working from within outward. The same thing is needed in the regulation of the family. Here too the influence on others must proceed from one’s own person. In order to be capable of producing such an influence, one’s words must have power, and this they can have only if they are based on something real, just as flame depends on its fuel. Words have influence only when they are pertinent and clearly related to definite circumstances. General discourses and admonitions have no effect whatsoever. Furthermore, the words must be supported by one’s entire conduct, just as the wind is made effective by its duration. Only firm and consistent conduct will make such an impression on others that they can adapt and conform to it. If words and conduct are not in accord and not consistent, they will have no effect.`,
    eranos: `The situation described by this hexagram is characterized by the community of a household, people sharing a living space.`
  },
  {
    name: `Disharmony`,
    subtile: `kui`,
    image: `38.jpg`,
    alt: `fire above lake`,
    kua: `fire above, the lake below. disharmony.\na junzi uses assimilation while retaining his individuality.`,
    sequence: `When the way of the Family draws to an end, misunderstandings come. Hence there follows the hexagram of Opposition. Opposistion means misunderstandings.`,
    wilhelm: `The two elements, fire and water, never mingle but even when in contact retain their own natures. So the cultured man is never led into baseness or vulgarity through intercourse or community of interests with persons of another sort; regardless of all commingling, he will always preserve his individuality.`,
    eranos: `The situation described by this hexagram is characterized by a tension between polar opposites, which needs to be acknowledged and given its proper place.`
  },
  {
    name: `Halting`,
    subtile: `jian`,
    image: `39.jpg`,
    alt: `water above mountain`,
    kua: `the mountain possesses water above. halting.\na junzi uses reflection upon himself to cultivate devotion.`,
    sequence: `Through opposition difficulties necessarily arise. Hence there follows the hexagram of Obstruction. Obstruction means difficulty.`,
    wilhelm: `Difficulties and obstructions throw a man back upon himself. While the inferior man seeks to put the blame on other persons, bewailing his fate, the superior man seeks the error within himself, and through this introspection the external obstacle becomes for him an occasion for inner enrichment and education.`,
    eranos: `The hexagram describes a situation in which progress is hampered by obstacles and difficulties, and it is possible to proceed only haltingly and with heaviness.`
  },
  {
    name: `Solution`,
    subtile: `xie`,
    image: `40.jpg`,
    alt: `thunder above water`,
    kua: `thunder and rain arrive. solution.\na junzi uses forgiving faults and pardoning crimes.`,
    sequence: `Things cannot be permanently amid obstructions. Hence there follows the hexagram of Deliverance. Deliverance means release from tension.`,
    wilhelm: `A thunderstorm has the effect of clearing the air; the superior man produces a similar effect when dealing with mistakes and sins of men that induce a condition of tension. Through clarity he brings deliverance. However, when failings come to light, he does not dwell on them; he simply passes over mistakes, the unintentional transgressions, just as thunder dies away. He forgives misdeeds, the intentional transgressions, just as water washes everything clean.`,
    eranos: `The situation described by this hexagram is characterized by analyzing, dissolving obstacles to understanding, freeing energy that was previously blocked.`
  },
  {
    name: `Reduction`,
    subtile: `sun`,
    image: `41.jpg`,
    alt: `mountain above lake`,
    kua: `the mountain possesses a lake below. reduction.\na junzi uses curbing his anger and restraining his passions.`,
    sequence: `Through release of tension something is sure to be lost. Hence there follows the hexagram of Decrease.`,
    wilhelm: `The lake at the foot of the mountain evaporates. In this way it decreases to the benefit of the mountain, which is enriched by its moisture. The mountain stands as the symbol of a stubborn strength that can harden into anger. The lake is the symbol of unchecked gaiety that can develop into passionate drives at the expense of the life forces. Therefore decrease is necessary; anger must be decreased by keeping still, the instincts must be curbed by restriction. By this decrease of the lower powers of the psyche, the higher aspects of the soul are enriched.`,
    eranos: ` The situation described by this hexagram is characterized by decrease, reducing one's involvement, withdrawing energy from the matter at hand.`
  },
  {
    name: `Increase`,
    subtile: `yi`,
    image: `42.jpg`,
    alt: `wind above thunder`,
    kua: `wind and thunder. increase.\na junzi uses seeing ways to improve and consequently emulating them, having faults and consequently correcting them.`,
    sequence: `If decrease goes on and on, it is certain to bring about increase. Hence there follows the hexagram of Increase.`,
    wilhelm: `While observing how thunder and wind increase and strengthen each other, a man can note the way to self-increase and self-improvement. When he discovers good in others, he should imitate it and thus make everything on earth his own. If he perceives something bad in himself, let him rid himself of it. In this way he becomes free of evil. This ethical change represents the most important increase of personality.`,
    eranos: `The situation described by this hexagram is characterized by increase, expanding one's involvement, pouring new energy into the matter at hand.`
  },
  {
    name: `Removal`,
    subtile: `guai`,
    image: `43.jpg`,
    alt: `lake above heaven`,
    kua: `the lake above adjoins heaven. removal.\na junzi uses disseminating revenues to reach those below. by embodying devotion he consequently remains unpretentious.`,
    sequence: `If increase goes on unceasingly, there is certain to be a break-through. Hence there follows the hexagram of Break-Through. Break-through means resoluteness.`,
    wilhelm: `When the water of a lake has risen up to heaven, there is reason to fear a cloudburst. Taking this as a warning, the superior man forestalls a violent collapse. If a man were to pile up riches for himself alone, without considering others, he would certainly experience a collapse. For all gathering is followed by dispersion. Therefore the superior man begins to distribute while he is accumulating. In the same way, in developing his character he takes care not to become hardened in obstinacy but to remain receptive to impressions by help of strict and continuous self-examination.`,
    eranos: `The situation described by this hexagram is characterized by a breakthrough or resolution after a long accumulated tension, like a flooding river overflowing its banks and parting into different streams.`
  },
  {
    name: `Meeting`,
    subtile: `gou`,
    image: `44.jpg`,
    alt: `heaven above wind`,
    kua: `heaven possesses wind below. meeting.\nthus rulers use disseminating directives to instruct the four quarters.`,
    sequence: `Through resoluteness one is certain to encounter something. Hence there follows the hexagram of Coming to Meet. Coming to meet means encountering.`,
    wilhelm: `The situation here resembles that in hexagram (20) Contemplation. In the latter the wind blows over the earth, here it blows under heaven; in both cases it goes everywhere. There the wind is on the earth and symbolizes the ruler taking note of the conditions in his kingdom; here the wind blows from above and symbolizes the influence exercised by the ruler through his commands. Heaven is far from the things of earth, but it sets them in motion by means of the wind. The ruler is far from his people, but he sets them in motion by means of his commands and decrees.`,
    eranos: `The situation described by this hexagram is characterized by the magnetic attraction of primal Yin and Yang, a meeting driven by powerful instinctual forces, beyond the control of social or personal considerations.`
  },
  {
    name: `Gathering`,
    subtile: `cui`,
    image: `45.jpg`,
    alt: `lake above earth`,
    kua: `the lake above adjoins earth. gathering.\na junzi uses defensive weapons to skillfully guard against the unexpected.`,
    sequence: `When creatures meet one another, they mass together. Hence there follows the hexagram of Gathering Together. Gathering together means massing.`,
    wilhelm: `If the water in the lake gathers until it rises above the earth, there is danger of a break-through. Precautions must be taken to prevent this. Similarly where men gather together in great numbers, strife is likely to arise; where possessions are collected, robbery is likely to occur. Thus in the time of Gathering Together we must arm promptly to ward off unexpected events against which we are not forearmed. If we are prepared, they can be prevented.`,
    eranos: `The situation described by this hexagram is characterized by people or things assembling and forming compact clusters, like grass densely intertwined.`
  },
  {
    name: `Rising`,
    subtile: `sheng`,
    image: `46.jpg`,
    alt: `earth above wood`,
    kua: `earth's center generates wood. rising.\na junzi using obedient devotion builds upon the small to achieve the impeccably great.`,
    sequence: `Massing toward the top is called pushing upward. Hence there follows the hexagram of Pushing Upward.`,
    wilhelm: `Adapting itself to obstacles and bending around them, wood in the earth grows upward without haste and without rest. Thus too the superior man is devoted in character and never pauses in his progress.`,
    eranos: `The situation described by this hexagram is characterized by ascending, being promoted, climbing step by step, moving towards a higher or finer goal.`
  },
  {
    name: `Exhaustion`,
    subtile: `kun`,
    image: `47.jpg`,
    alt: `lake above water`,
    kua: `the lake has no water. exhaustion.\na junzi uses devoting his life to achieving his willful-purpose.`,
    sequence: `If one pushes upward without stopping, he is sure to meet oppression. Hence there follows the hexagram of Oppression.`,
    wilhelm: `When the water has flowed out below, the lake must dry up and become exhausted. That is fate. This symbolizes an adverse fate in human life. In such times there is nothing a man can do but acquiesce in his fate and remain true to himself. This concerns the deepest stratum of his being, for this alone is superior to all external fate.`,
    eranos: `The situation described by this hexagram is characterized by an enclosure or restriction that causes the life energy to contract and forces one to find a way to grow within the limitations imposed by the circumstance.`
  },
  {
    name: `The Well`,
    subtile: `jing`,
    image: `48.jpg`,
    alt: `water above wood`,
    kua: `wood possesses water above. the well.\na junzi employs a hardworking populace by encouraging reciprocity.`,
    sequence: `He who is oppressed above is sure to turn downward. Hence there follows the hexagram of the Well.`,
    wilhelm: `The trigram Sun, wood, is below, and the trigram K'an, water is above it. Wood sucks water upward. Just as wood as an organism imitates the action of the well, which benefits all parts of the plant, the superior man organizes human society, so that, as in a plant organism, its parts cooperate for the benefit of the whole.`,
    eranos: `The situation described by this hexagram is characterized by the waters of life welling up from the depth. Maintaining a clear access to this central life source is crucial for one's well-being and nourishment.`
  },
  {
    name: `Revolution`,
    subtile: `ge`,
    image: `49.jpg`,
    alt: `lake above fire`,
    kua: `the lake's center possesses fire. revolution.\na junzi uses organizing calendars and clarifying the seasons.`,
    sequence: `The setup of a well must necessarily be revolutionized in the course of time. Hence there follows the hexagram of Revolution.`,
    wilhelm: `Fire below and lake above combat and destroy each other. So too in the course of a year a combat takes place between the forces of light and the forces of darkness, eventuating in the revolution of the seasons. Man masters these changes in nature by noting their regularity and marking off the passage of time accordingly. In this way order and clarity appear in the apparently chaotic changes of the seasons, and man is able to adjust himself to the demands of the different times.`,
    eranos: `The situation described by this hexagram is characterized by radically renewing one's presentation, peeling away an old skin which is no longer adequate.`
  },
  {
    name: `The Cauldron`,
    subtile: `ding`,
    image: `50.jpg`,
    alt: `fire above wood`,
    kua: `wood possesses fire above. the cauldron.\na junzi uses the proper position to converge upon his fate.`,
    sequence: `Nothing transforms things so much as the ting. Hence there follows the hexagram of the Cauldron.`,
    wilhelm: `The fate of fire depends on wood; as long as there is wood below, the fire burns above. It is the same in human life; there is in man likewise a fate that lends power to his life. And if he succeeds in assigning the right place to life and to fate, thus bringing the two into harmony, he puts his fate on firm footing.`,
    eranos: `The situation described by this hexagram is characterized by the alchemical image of a sacred vessel which transforms its contents into spiritual nourishment, and offering to higher powers.`
  },
  {
    name: `The Shake - Thunder`,
    subtile: `zhen`,
    image: `51.jpg`,
    alt: `thunder`,
    kua: `repeated thunder. the shake.\na junzi uses caution and trepidation while practicing introspection.`,
    sequence: `Among the custodians of the sacred vessels, the eldest son stands first. Hence there follows the hexagram of the Arousing. The Arousing means movement.`,
    wilhelm: `The shock of continuing thunder brings fear and trembling. The superior man is always filled with reverence at the manifestation of god; he sets his life in order and searches his heart, lest it harbor any secret opposition to the will of god. Thus reverence is the foundation of true culture.`,
    eranos: `The situation described by this hexagram is characterized by a powerful energy rising from the depth, a sudden frightening, awakening and inspiring shock. The hexagram The Shake is the doubling of the corresponding trigram, and partakes of its attributes.`
  },
  {
    name: `The Bound - Mountain`,
    subtile: `gen`,
    image: `52.jpg`,
    alt: `mountain`,
    kua: `joined mountains. the bound.\na junzi uses thoughts that do not extend beyond his own purview.`,
    sequence: `Things cannot move continuously, one must make them stop. Hence there follows the hexagram of Keeping Still. Keeping Still means stopping.`,
    wilhelm: `The heart thinks constantly. This cannot be changed, but the movements of the heart—that is, a man’s thoughts—should restrict themselves to the immediate situation. All thinking that goes beyond this only makes the heart sore.`,
    eranos: `The situation described by this hexagram is characterized by a limit or boundary which marks the end of a cycle, a time to stop, reflect and prepare for the transition to a new phase. The hexagram The Bound is the doubling of the corresponding trigram, and partakes of its attributes.`
  },
  {
    name: `Gradual Progress`,
    subtile: `jian`,
    image: `53.jpg`,
    alt: `wood above mountain`,
    kua: `the mountain possesses wood above. gradual progress.\na junzi uses an enduring impeccable devotion to improve his conduct.`,
    sequence: `Things cannot stop forever; hence there follows the hexagram of Development. Development means to progress.`,
    wilhelm: `The tree on the mountain is visible from afar, and its development influences the landscape of the entire region. It does not shoot up like a swamp plant; its growth proceeds gradually. Thus also the work of influencing people can only be gradual. No sudden influence or awakening is of lasting effect. Progress must be quite gradual, and in order to obtain such progress in public opinion and in the mores of the people, it is necessary for the personality to acquire influence and weight. This comes about through careful and constant work on one's own moral development.`,
    eranos: `The situation described by this hexagram is characterized by a gradual and steady penetration extending its influence by degrees, like water seeping into cracks.`
  },
  {
    name: `Marrying a Young Woman`,
    subtile: `gui mei`,
    image: `54.jpg`,
    alt: `thunder above lake`,
    kua: `the lake possesses thunder above. marrying a young woman.\na junzi uses persistence in completely discovering his faults.`,
    sequence: `Through progress one is sure to reach the place where one belongs. Hence there follows the hexagram of the Marrying Maiden.`,
    wilhelm: `Thunder stirs the water of the lake, which follows it in shimmering waves. This symbolizes the girl who follows the man of her choice. But every relationship between individuals bears within it the danger that wrong turns may be taken, leading to endless misunderstandings and disagreements. Therefore it is necessary constantly to remain mindful of the end. If we permit ourselves to drift along, we come together and are parted again as the day may determine. If on the other hand a man fixes his mind on an end that endures, he will succeed in avoiding the reefs that confront the closer relationships of people.`,
    eranos: `The situation described by this hexagram is characterized by realizing one's nature by accepting one's allotted destiny, as in the traditional image of a maiden finding her social maturity by entering the house of her husband.`
  },
  {
    name: `Abundance`,
    subtile: `feng`,
    image: `55.jpg`,
    alt: `thunder above fire`,
    kua: `thunder and lightning both arrive. abundance.\na junzi uses deciding lawsuitsand executing punishments.`,
    sequence: `That which attains a place in which it is at home is sure to become great. Hence there follows the hexagram of Abundance. Abundance means greatness.`,
    wilhelm: `This hexagram has a certain connection with Biting Through (21), in which thunder and lightning similarly appear together, but in the reverse order. In Biting Through, laws are laid down; here they are applied and enforced. Clarity within makes it possible to investigate the facts exactly, and shock without ensures a strict and precise carrying out of punishments.`,
    eranos: `The situation described by this hexagram is characterized by a peak of development, a culmination that can be fully expressed and enjoyed, even with the awareness that it will be inevitably followed by a decline.`
  },
  {
    name: `Travel`,
    subtile: `lü`,
    image: `56.jpg`,
    alt: `fire over mountain`,
    kua: `the mountain possesses fire above. travel.\na junzi uses understanding and prudence when applying punishments and does not protract lawsuits.`,
    sequence: `Whatever greatness may exhaust itself upon, this much is certain: it loses its home. Hence there follows the hexagram of the Wanderer.`,
    wilhelm: `When grass on a mountain takes fire, there is bright light. However, the fire does not linger in one place, but travels on to new fuel. It is a phenomenon of short duration. This is what penalties should be like. They should be a quickly passing matter, and must not be dragged out indefinitely. Prisons ought to be places where people are lodged only temporarily, as guests are. They must not become dwelling places.`,
    eranos: `The situation described by this hexagram is characterized by traveling, being away from home, living abroad, residing in a foreign context.`
  },
  {
    name: `The Root - Wind`,
    subtile: `sun`,
    image: `57.jpg`,
    alt: `wind`,
    kua: `successive winds. the root.\na junzi uses communicating directions and inspiring action.`,
    sequence: `The wanderer has nothing that might receive him; hence there follows the hexagram of the Gentle, the Penetrating. The Gentile means going into.`,
    wilhelm: `The penetrating quality of the wind depends upon its ceaselessness. This is what makes it so powerful; time is its instrument. In the same way the ruler's thought should penetrate the soul of the people. This too requires a lasting influence brought about by enlightenment and command. Only when the command had been assimilated by the people is action in accordance with it possible. Action without preparation of the ground only frightens and repels.`,
    eranos: `The situation described by this hexagram is characterized by grounding, gently supporting and nourishing things from below. The hexagram The Root is the doubling of the corresponding trigram, and partakes of its attributes.`
  },
  {
    name: `The Open - Lake`,
    subtile: `tui`,
    image: `58.jpg`,
    alt: `lake`,
    kua: `joined lakes. the open.\na junzi uses joining with companions for mutual discussion and practice.`,
    sequence: `When one has penetrated something, one rejoices. Hence there follows the hexagram of the Joyous. The Joyous means to rejoice.`,
    wilhelm: `A lake evaporates upward and thus gradually dries up; but when two lakes are joined they do not dry up so readily, for one replenishes the other. It is the same in the field of knowledge. Knowledge should be a refreshing and vitalizing force. It becomes so only through stimulating intercourse with congenial friends with whom one holds discussion and practices application of the truths of life. In this way learning becomes many-sided and takes on a cheerful lightness, whereas there is always something ponderous and one-sided about the learning of the self-taught.`,
    eranos: `The situation described by this hexagram is characterized by an openness to interaction, communication and exchange, which brings joyous stimulation. The hexagram The Open is the doubling of the corresponding trigram, and partakes of its attributes.`
  },
  {
    name: `Dispersal`,
    subtile: `huan`,
    image: `59.jpg`,
    alt: `wind above water`,
    kua: `the wind moves above water. dispersal.\nancient kings used reverence to god and established shrines.`,
    sequence: `After joy comes dispersal. Hence there follows the hexagram of Dispersion. Dispersion means scattering.`,
    wilhelm: `In the autumn and winter, water begins to freeze into ice. When the warm breezes of spring come, the rigidity is dissolved, and the elements that have been dispersed in ice floes are reunited. It is the same with the minds of the people. Through hardness and selfishness the heart grows rigid, and this rigidity leads to a separation from all others. Egotism and cupidity isolate men. Therefore the hearts of men must be seized by a devout emotion. They must be shaken by a religious awe in the face of eternity—stirred with an intuition of the one creator of all living beings, and united through the strong feeling of fellowship experienced in the ritual of divine worship.`,
    eranos: `The situation described by this hexagram is characterized by dissolving obstacles, illusions or misunderstandings, like clouds clearing away.`
  },
  {
    name: `Discipline`,
    subtile: `jieh`,
    image: `60.jpg`,
    alt: `water above lake`,
    kua: `the lake possesses water above. discipline.\na junzi uses defining enumeration and measurement, and carefully deliberates devout conduct.`,
    sequence: `Things cannot be forever separate. Hence there follows the hexagram of Limitation.`,
    wilhelm: `A lake is something limited. Water is inexhaustible. A lake can contain only a definite amount of the infinite quantity of water; this is its peculiarity. In human life too the individual achieves significance through discrimination and the setting of limits. Therefore what concerns us here is the problem of clearly defining these discriminations, which are, so to speak, the backbone of morality. Unlimited possibilities are not suited to man; if they existed, his life would only dissolve in the boundless. To become strong, a man’s life needs the limitations ordained by duty and voluntarily accepted. The individual attains significance as a free spirit only by surrounding himself with these limitations and by determining for himself what his duty is.`,
    eranos: `The situation described by this hexagram is characterized by clearly expressing boundaries and connections, correctly partitioning a whole while acknowledging its essential unity.`
  },
  {
    name: `Sincerity in the Center`,
    subtile: `zhong fu`,
    image: `61.jpg`,
    alt: `wind above lake`,
    kua: `the lake possesses wind above. sincerity in the center.\na junzi uses pondering law suits and postponing executions.`,
    sequence: `Through being limited, things are made dependable. Hence there follows the hexagram of Inner Truth.`,
    wilhelm: `Wind stirs water by penetrating it. Thus the superior man, when obliged to judge the mistakes of men, tries to penetrate their minds with understanding, in order to gain a sympathetic appreciation of the circumstances. In ancient China, the entire administration of justice was guided by this principle. A deep understanding that knows how to pardon was considered the highest form of justice. This system was not without success, for its aim was to make so strong a moral impression that there was no reason to fear abuse of such mildness. For it sprang not from weakness but from a superior clarity.`,
    eranos: `The situation described by this hexagram is characterized by bringing one's inner being and outer circumstances into a sincere and reliable accord.`
  },
  {
    name: `Small Excess`,
    subtile: `xiao guo`,
    image: `62.jpg`,
    alt: `thunder above mountain`,
    kua: `the mountain possesses thunder above. small excess.\na junzi uses conduct excessive in courtesy, sadness excessive in mourning, spending excessive in economy.`,
    sequence: `When one has the trust of creatures, one sets them in motion; hence there follows the hexagram of Preponderance of the Small.`,
    wilhelm: `Thunder on the mountain is different from thunder on the plain. In the mountains, thunder seems much nearer; outside the mountains, it is less audible than the thunder of an ordinary storm. Thus the superior man derives an imperative from this image: he must always fix his eyes more closely and more directly on duty than does the ordinary man, even though this might make his behavior seem petty to the outside world. He is exceptionally conscientious in his actions. In bereavement emotion means more to him than ceremoniousness. In all his personal expenditures he is extremely simple and unpretentious. In comparison with the man of the masses, all this makes him stand out as exceptional. But the essential significance of his attitude lies in the fact that in external matters he is on the side of the lowly.`,
    eranos: `The situation described by this hexagram is characterized by the excessive predominance of a variety of small concerns, which might obscure the overall significance.`
  },
  {
    name: `Settled`,
    subtile: `ji ji`,
    image: `63.jpg`,
    alt: `water above fire`,
    kua: `water located above fire. settled.\na junzi uses considering problems and making plans to prevent them.`,
    sequence: `He who stands above things brings them to completion. Hence there follows the hexagram of After Completion.`,
    wilhelm: `When water in a kettle hangs over fire, the two elements stand in relation and thus generate energy (the production of steam). But the resulting tension demands caution. If the water boils over, the fire is extinguished and its energy is lost. If the heat is too great, the water evaporates into the air. These elements here brought into relation and thus generating energy are by nature hostile to each other. Only the most extreme caution can prevent damage. In life too there are junctures when all forces are in balance and work in harmony, so that everything seems to be in the best of order. In such times only the sage recognizes the moments that bode danger and knows how to banish it by means of timely precautions.`,
    eranos: `The situation described by this hexagram is characterized by involvement in a process which is already on its way to completion, being already engaged in a course of action.`
  },
  {
    name: `Unsettled`,
    subtile: `wei ji`,
    image: `64.jpg`,
    alt: `fire above water`,
    kua: `fire located above water. unsettled.\na junzi uses careful discrimination of beings and maintaining boundaries.`,
    sequence: `Things cannot exhaust themselves. Hence there follows, at the end, the hexagram of Before Completion.`,
    wilhelm: `When fire, which by nature flames upward, is above, and water, which flows downward, is below, the effects take opposite directions and remain unrelated. If we wish to achieve an effect, we must first investigate the nature of the forces in question and ascertain their proper place. If we can bring those forces to bear in the right place, they will have the desired effect, and completion will  be achieved. But in order to handle external forces properly, we must above all arrive at the correct standpoint ourselves, for only from this vantage can we work correctly.`,
    eranos: `The situation described by this hexagram is characterized by involvement in a process which is still far from completion, being on the brink of a move whose outcome cannot yet be discerned.`
  },
];
